import useWindowDimensions from "../useWindowDimensions.tsx";
import { Person, Show } from '../data.js';

const CreditsBlock = ({ show, goToBio }: { show: Show, goToBio: (name: string) => void }) => {
  const { showName, writerCredit, adapterCredit, directorCredit, description, credits } = show;


  return (
    <div className="programBlock">
      <div className="programBlock-header">
        <h3>{showName}</h3>
        <div className="programBlock-header--highlightCredits">

          {directorCredit && (
            <a onClick={() => goToBio(directorCredit)}>
              <h4 className="highlightCredit">Directed by {directorCredit}
                <span className="material-symbols-outlined">
                  history_edu
                </span></h4>

            </a>
          )}

          {writerCredit && <h4 className="highlightCredit">Written by {writerCredit}</h4>}
          {adapterCredit && <h4 className="highlightCredit">Adapted by {adapterCredit}</h4>}

        </div>
      </div>
      {description && <p>{description}</p>}
      {credits.map((credit) => (
        <SingleCredit credit={credit} goToBio={goToBio} />
      ))}
    </div>
  );
};

const SingleCredit = ({ credit, goToBio }: { credit: Person, goToBio: (name: string) => void }) => {
  const { name, roles } = credit;
  const { width } = useWindowDimensions();
  const wrapFixRole = roles.length > 10 && width < 400;
  const wrapFixName = name.length > 10 && width < 400;



  return (
    <div className="singleCredit">
      <span className={`singleCredit-role ${wrapFixRole ? "wrapFix" : "noFix"}`}>{roles}</span>
      <span className="dots"></span>
      <a onClick={() => goToBio(name)} className={`singleCredit-name ${wrapFixName ? "wrapFix" : "noFix"}`}>
        {name}
        <span className="material-symbols-outlined">
          history_edu
        </span>
      </a>
    </div>
  );
};


export default CreditsBlock;
