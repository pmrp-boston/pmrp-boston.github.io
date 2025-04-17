import { Person } from "../data.js";
import { Element } from "react-scroll";

const Bios = ({credits}: {credits: Person[]}) => {
  const compare = (a: Person, b: Person) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  credits.sort(compare);

  return (
    <div className="biosBlock">
      <h3 className="biosBlock-title">Cast & Crew Bios</h3>
      <div className="biosBlock-wrapper">
        {credits.map((bio) => {
          if (!bio.bio) return null; // Skip if no name
          return <SingleBio name={bio.name} bioText={bio.bio} />;
        })}
      </div>
    </div>
  );
};

const SingleBio = ({ name, bioText }: {name: string, bioText: string}) => {
  return (
    <Element name={name}>
      <div className="biosBlock-singleBio" id={name}>
        <h4 className="biosBlock-singleBio--title">{name}</h4>
        <div className="biosBlock-singleBio--copyText">{bioText}</div>
      </div>
    </Element>
  );
};

// const SingleBioWithScroll = ScrollElement(SingleBio);

export default Bios;
