import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown } from 'lucide-react';

interface SelectProps<Value extends string> {
  id: string;
  label: string;
  value: Value;
  options: readonly { value: Value; label: string }[];
  onChange: (value: Value) => void;
}

export default function Select<Value extends string>({ id, label, value, options, onChange }: SelectProps<Value>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: '', time: 0 });
  const selectedIndex = options.findIndex(option => option.value === value);
  const listId = `${id}-options`;

  const show = (index = Math.max(0, selectedIndex)) => {
    setActiveIndex(index);
    typeahead.current = { text: '', time: 0 };
    setOpen(true);
  };
  const choose = (index: number) => {
    if (options[index]) onChange(options[index].value);
    setOpen(false);
  };

  // Render outside the table's clipping container, and keep the menu in the viewport.
  useLayoutEffect(() => {
    if (!open) return;
    const position = () => {
      if (!trigger.current || !menu.current) return;
      const rect = trigger.current.getBoundingClientRect();
      if (!trigger.current.getClientRects().length || rect.bottom < 0 || rect.top > window.innerHeight) {
        setOpen(false);
        return;
      }
      const edge = 8;
      const gap = 6;
      const width = Math.min(Math.max(rect.width, 160), window.innerWidth - edge * 2);
      const below = window.innerHeight - rect.bottom - gap - edge;
      const above = rect.top - gap - edge;
      const upwards = below < Math.min(menu.current.scrollHeight, 260) && above > below;
      const maxHeight = Math.max(0, Math.min(260, upwards ? above : below));
      const height = Math.min(menu.current.scrollHeight + 2, maxHeight);
      setMenuStyle({
        width,
        maxHeight,
        left: Math.max(edge, Math.min(rect.right - width, window.innerWidth - width - edge)),
        top: Math.max(edge, upwards ? rect.top - gap - height : rect.bottom + gap),
      });
    };
    position();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => {
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const list = menu.current;
    const option = list?.children[activeIndex] as HTMLElement | undefined;
    if (!list || !option) return;
    // Scroll only the options, so opening a portal never shifts the page itself.
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight;
    }
  }, [open, activeIndex, menuStyle.maxHeight]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Tab') {
      if (open) choose(activeIndex);
      return;
    }
    if (event.key === 'Escape') {
      if (open) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
      }
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) choose(activeIndex);
      else show();
      return;
    }
    if (event.altKey && event.key === 'ArrowUp' && open) {
      event.preventDefault();
      choose(activeIndex);
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'PageDown', 'PageUp'].includes(event.key)) {
      event.preventDefault();
      const last = options.length - 1;
      if (event.key === 'Home') show(0);
      else if (event.key === 'End') show(last);
      else if (!open) show();
      else {
        const step = event.key === 'PageDown' ? 10 : event.key === 'PageUp' ? -10 : event.key === 'ArrowDown' ? 1 : -1;
        setActiveIndex(index => Math.max(0, Math.min(last, index + step)));
      }
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      event.stopPropagation();
      const now = Date.now();
      const text = (now - typeahead.current.time < 700 ? typeahead.current.text : '') + event.key.toLocaleLowerCase();
      typeahead.current = { text, time: now };
      const query = [...text].every(character => character === text[0]) ? text[0] : text;
      const start = query.length === 1 ? (open ? activeIndex : selectedIndex) + 1 : activeIndex;
      const index = options.findIndex((_, offset) => options[(start + offset) % options.length].label.toLocaleLowerCase().startsWith(query));
      if (index !== -1) setActiveIndex((start + index) % options.length);
      else if (!open) setActiveIndex(Math.max(0, selectedIndex));
      setOpen(true);
    }
  };

  return <>
    <button
      ref={trigger}
      id={id}
      type="button"
      role="combobox"
      className="select-trigger"
      aria-label={label}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? listId : undefined}
      aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
      onClick={() => open ? setOpen(false) : show()}
      onKeyDown={onKeyDown}
      onBlur={() => { if (open) setOpen(false); }}
    >
      <span className="select-value">{options[selectedIndex]?.label ?? value}</span>
      <ChevronDown className="select-chevron" size={14} aria-hidden="true" />
    </button>
    {open && createPortal(
      <ul ref={menu} id={listId} role="listbox" aria-label={label} className="select-menu" style={menuStyle}>
        {options.map((option, index) => <li
          key={option.value}
          id={`${listId}-${index}`}
          role="option"
          aria-selected={option.value === value}
          className={`select-option ${index === activeIndex ? 'is-active' : ''}`}
          onPointerMove={event => { if (event.pointerType === 'mouse') setActiveIndex(index); }}
          onPointerDown={event => event.preventDefault()}
          onClick={() => { choose(index); trigger.current?.focus({ preventScroll: true }); }}
        >
          <span>{option.label}</span>
          {option.value === value && <Check size={14} aria-hidden="true" />}
        </li>)}
      </ul>, document.body,
    )}
  </>;
}
