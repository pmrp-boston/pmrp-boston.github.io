import CreditsBlock from "../components/CreditsBlock.js";
import Bios from "../components/Bios.js";
import ResponsiveHeroImage from "../components/ResponsiveHeroImage.js";
import { scroller } from "react-scroll";
import { Person, Show, groupPeopleByShow, ShowKeys, showNames } from "../data.js";
import "../App.scss";

const Program = ({ data }: { data: Person[] }) => {
  const scrollToBio = (name: string) => scroller.scrollTo(name, {});
  const peopleByShow = groupPeopleByShow(data);

  const showInfo = [] as Show[];
  for (const show in peopleByShow) {
    // console.log(show);
    const showName = showNames[show as ShowKeys];
    const credits = peopleByShow[show as ShowKeys];
    const writerCredit = data.find((person) => person.shows.includes(show as ShowKeys) && person.roles.includes("Writer"))?.name;
    const directorCredits = data.filter((person) => person.shows.includes(show as ShowKeys) && person.roles.includes("Director"));
    const adapterCredit = data.find((person) => person.shows.includes(show as ShowKeys) && person.roles.match(/Adapted/i))?.name;
    const foleyCredits = data.filter((person) => person.shows.includes(show as ShowKeys) && person.roles.match(/Foley/i));
    const showData = {
      [show as ShowKeys]: {
        showName,
        writerCredit,
        adapterCredit,
        directorCredits,
        credits,
        foleyCredits
      },
    };
    showInfo.push(showData[show as ShowKeys]);
  }
  console.log(showInfo)
  // return showInfo


  return (
    <div>
      <header>
        <h4 className="preHeader">The Post Meridian Radio Players Present</h4>
        <ResponsiveHeroImage />
      </header>
      <div className="content">
        <div className="credits">
          {/*<ATFProgramInfo />*/}
          {showInfo.map((show) => (
            <CreditsBlock show={show} goToBio={scrollToBio} crewBlock={!show.showName} />
          ))}
          {/*<BTFProgramInfo />*/}
        </div>
        <div>
          <Bios credits={data} />
        </div>
      </div>

      <footer>{/* <AuditionFooter /> */}</footer>
    </div>
  );
};

export default Program;