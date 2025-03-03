export function IconToggleOn(props) {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="2em"
        width="2em"
        {...props}
      >
          <title>{props.title}</title>
        <path d="M5 3a5 5 0 000 10h6a5 5 0 000-10H5zm6 9a4 4 0 110-8 4 4 0 010 8z" />
      </svg>
    );
}