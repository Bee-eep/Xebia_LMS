import React from 'react';

export default function CountUp({
  to,
  className = '',
  separator = ''
}) {
  const options = {
    useGrouping: !!separator,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  };
  const formattedNumber = Intl.NumberFormat('en-US', options).format(to);
  const displayVal = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;

  return <span className={className}>{displayVal}</span>;
}

