function matchHouse(answers) {
  const axes = Object.keys(dimensions);
  const totals = Object.fromEntries(axes.map(axis => [axis, { points: 0, weight: 0 }]));

  for (const question of questions) {
    const option = question.options[answers.get(question.id)];
    if (!option) throw new Error(`Missing answer for ${question.id}`);

    const weight = questionTypes[question.type].weight;
    totals[question.axis].points += option[1] * weight;
    totals[question.axis].weight += weight;
  }

  const scores = Object.fromEntries(axes.map(axis => [axis, totals[axis].points / totals[axis].weight]));
  const ranked = houses.map(house => ({
    house,
    distance: axes.reduce((sum, axis) => sum + (scores[axis] - house.targets[axis]) ** 2, 0) / axes.length,
  }));
  ranked.sort((first, second) => {
    const difference = first.distance - second.distance;
    return Math.abs(difference) > 1e-9 ? difference : first.house.id.localeCompare(second.house.id, 'en');
  });

  const [best, second] = ranked;
  const evidence = [];
  for (const question of questions) {
    if (question.type === 'mood') continue;

    const [, score, phrase] = question.options[answers.get(question.id)];
    const target = best.house.targets[question.axis];
    const axisScore = scores[question.axis];
    if (score * target > 0 && axisScore * target > 0) {
      evidence.push({
        axis: question.axis, type: question.type, phrase,
        strength: Math.abs(score * target * axisScore),
      });
    }
  }
  evidence.sort((first, second) => second.strength - first.strength);
  const habit = evidence.find(item => item.type === 'wardrobe') ?? evidence[0];
  const preference = habit && (
    evidence.find(item => item.axis !== habit.axis && item.type !== habit.type) ??
    evidence.find(item => item.axis !== habit.axis)
  );

  return {
    house: best.house,
    scores,
    evidence: [habit, preference].filter(Boolean).map(item => ({
      phrase: item.phrase, label: questionTypes[item.type].label,
    })),
    close: Boolean(second && second.distance - best.distance < 0.15),
  };
}
