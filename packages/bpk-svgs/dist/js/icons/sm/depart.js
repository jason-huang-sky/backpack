import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M3.4 8.3l-1.3-.9c-.2-.1-.1-.3.1-.4l1-.4c.1-.1.3 0 .4 0l1.5.9L8 6.4 4.4 2.7c-.2-.1-.1-.4 0-.4l.4-.2c.5-.2 1-.1 1.4.1l4.4 3.1 4.1-1.6c.4-.2 1 .1 1.2.5s-.1.9-.5 1.1L7.3 8.5c-1.1.4-2.3.4-3.4.1-.2-.1-.4-.2-.5-.3zm8.4 4.2l-4.2-2.4c-.3-.2-.8 0-.8.5V12H3c-.6 0-1 .4-1 1s.4 1 1 1h3.8v1.4c0 .4.5.7.9.5l4.2-2.4c.3-.2.3-.8-.1-1z" /></svg>;
  }

}