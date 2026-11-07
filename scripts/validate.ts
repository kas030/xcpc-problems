import assert from 'node:assert/strict';
import { buildCatalog } from './build-catalog';
import { at, readJson } from './io';
import { difficultyNames, type Catalog } from '../src/lib/schema';

const actual = await readJson<Catalog>(at('data/catalog.json'));
const expected = await buildCatalog(false);
assert.deepEqual(actual, expected, '索引与源数据不一致，请运行 npm run catalog');
assert(actual.problems.length > 0, '题库不能为空');
assert.equal(new Set(actual.problems.map(p => p.id)).size, actual.problems.length, '题目 ID 重复');
for (const p of actual.problems) {
  assert(difficultyNames.includes(p.difficulty), `难度标签无效：${p.id}`);
  assert(p.solved <= p.participants, `通过数量错误：${p.id}`);
  assert(Number.isInteger(p.qojId) && p.qojId > 0, `QOJ 题面入口缺失：${p.id}`);
  for (const c of Object.values(p.cohorts)) {
    assert(c.solved <= c.total && c.solved >= 0);
    assert(c.rate === null || (c.rate >= 0 && c.rate <= 1));
  }
}
console.log(`数据校验通过：${actual.contests.length} 场比赛，${actual.problems.length} 道题。`);
