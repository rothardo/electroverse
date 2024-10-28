
interface IProps {
    id: string;
    value: string;
    groupName?: string;
  }
  
  const RadioButton = ({ id, value, groupName = "" }: IProps) => {
    return (
      <div className="flex items-center gap-8">
        <input type="radio" name={groupName} id={id} value={value} />
        <label htmlFor={id}>{value}</label>
      </div>

    );
  };
  
  export default RadioButton;