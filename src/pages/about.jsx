import React from 'react';

const About = (props) => {
  return (
    <div>
      <div>about page</div>
      {React.Children.map(props.children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};
export default About;
