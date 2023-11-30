import { useState, useEffect } from "react";
import { Image } from 'semantic-ui-react';

function Error() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="error-image">
      <Image key={key} src='././Error.gif' alt='error' />
    </div>
  );
}

export default Error;
