import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M10.5 7.5C10.5 8.3 9.8 9 9 9s-1.5-.7-1.5-1.5S8.2 6 9 6s1.5.7 1.5 1.5zm-1 2.5h-1c-1.1 0-2 .9-2 2l1 5h1v-3h1v3h1l1-5c0-1.1-.9-2-2-2z" /></svg>;
  }

}