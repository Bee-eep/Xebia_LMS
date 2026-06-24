import React, { useState, useEffect } from 'react';

export default function Typewriter({
  words = [],
  typingSpeed = 90,
  deletingSpeed = 50,
  delay = 1800,
  className = ""
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    let timer;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.slice(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex(prev => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse ml-0.5 border-r-2 border-tranquil-velvet">&nbsp;</span>
    </span>
  );
}
