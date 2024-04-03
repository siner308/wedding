import Leaf from '@/components/Background/Leaf';

const Background = () => {
  const leafCount = 10;

  const globalStyles = `
/* Define your animations within your global stylesheet that affects translateY and translateX respectively */
@keyframes fall {
  0% {
    top: -10%; /* Start from the initial vertical position*/
  }
  100% {
    top: 100%; /* End at the bottom of the viewport */
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  50% {
    transform: translateX(var(--translate-x)) rotate(var(--degree)); /* Adjust amplitude of shaking if necessary */
  }
}
`;

  return (
    <div>
      <style>{globalStyles}</style>
      {Array
        .from({ length: leafCount })
        .map((_, index) => {
          return (
            <Leaf key={index}/>
          );
        })}
    </div>
  );
};

export default Background;
