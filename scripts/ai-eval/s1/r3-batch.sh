#!/bin/bash
# 第三轮批量：r3-batch.sh <cond DN|D0> <lane codex|opus|sonnet> <reps> <tasks...>
# 每次运行用新根目录 /private/tmp/qingye-s1-r3/<cond>/<lane>-<T>-<n>；日志在 /private/tmp/qingye-s1-r3-logs/
S1="/Volumes/SUNSANG 1/Codex/qingye-ui/scripts/ai-eval/s1"
cond=$1; lane=$2; reps=$3; shift 3
mkdir -p /private/tmp/qingye-s1-r3-logs
case $lane in
  codex) A=(--agent codex);;
  opus) A=(--agent claude);;
  sonnet) A=(--agent claude --model claude-sonnet-5-5 --effort low);;
esac
for T in "$@"; do for n in $(seq 1 $reps); do
  node "$S1/run.mjs" --task $T --cond $cond "${A[@]}" --net off --rep $n --root "/private/tmp/qingye-s1-r3/$cond/$lane-$T-$n" > "/private/tmp/qingye-s1-r3-logs/$cond-$lane-$T-$n.log" 2>&1
  echo "$cond $lane $T $n exit=$?" >> "/private/tmp/qingye-s1-r3-logs/lane-$cond-$lane.done"
done; done
