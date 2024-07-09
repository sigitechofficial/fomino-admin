export default function RedButton(props) {
  return (
    <button
      className="flex items-center justify-center gap-1 text-sm border border-themeRed text-white 
      font-medium rounded-md px-2 py-2 h-10 bg-themeRed hover:bg-transparent hover:text-themeRed
      duration-100"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export function BlackButton(props) {
  return (
    <button
      className="flex items-center justify-center gap-1 text-sm border border-themeBorderGray
      text-white rounded-md px-2 py-2 h-10 bg-theme hover:bg-transparent hover:text-theme 
      duration-100 font-medium"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export function EditButton(props) {
  return (
    <button
      className="flex items-center justify-center gap-1 text-sm border border-theme text-theme 
      font-medium rounded-md px-2 py-2 h-10 hover:bg-theme hover:text-white
      duration-100"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export function TabButton(props) {
  return (
    <button className="relative" onClick={props.onClick}>
      <li
        className={`${
          props.tab === props.title ? "text-themeRed" : "text-black"
        } text-lg font-bold font-norms`}
      >
        {props.title}
      </li>
      {props.tab === props.title ? (
        <div className="w-full h-1 bg-themeRed rounded-lg absolute top-[32.5px]"></div>
      ) : (
        <></>
      )}
    </button>
  );
}
