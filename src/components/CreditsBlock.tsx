import useWindowDimensions from "../useWindowDimensions.tsx";
import { Person, Show } from '../data.js';

const CreditsBlock = ({show, goToBio}: {show: Show, goToBio?: (name: string)=> {}}) => {
  const { showName, writerCredit, directorCredit, description, credits } = show;
  

  return (
    <div className="programBlock">
      <div className="programBlock-header">
        <h3>{showName}</h3>
        {writerCredit && <h4 className="highlightCredit">{writerCredit}</h4>}
        {directorCredit && (
          <h4 className="highlightCredit">{directorCredit}</h4>
        )}
      </div>
      {description && <p>{description}</p>}
      {credits.map((credit) => (
        <SingleCredit credit={credit}  />
      ))}
    </div>
  );
};

const SingleCredit = ({ credit, goToBio }: {credit: Person, goToBio?: (name: string)=>{}}) => {
  const { name, roles } = credit;
  const {width} = useWindowDimensions();
  const wrapFixRole = roles.length > 16 && width < 400;
  const wrapFixName = name.length > 16 && width < 400;

  

  return (
    <div className="singleCredit">
      <span className={`singleCredit-role ${wrapFixRole ? "wrapFix" : "noFix"}`}>{roles}</span>
      <span className="dots"></span>
      {/* <a onClick={() => goToBio(name)} className={`singleCredit-name ${wrapFixName ? "wrapFix" : "noFix"}`}> */}
        {name}
      {/* </a> */}
    </div>
  );
};


export default CreditsBlock;
