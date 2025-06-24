export function getEmotionImage(emotion_id) {
  switch (emotion_id) {
    case 1:
      return '/emotion1.png';
    case 2:
      return '/emotion2.png';
    case 3:
      return '/emotion3.png';
    case 4:
      return '/emotion4.png';
    case 5:
      return '/emotion5.png';
    default:
      return null;
  }
}
