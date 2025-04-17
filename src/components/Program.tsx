import CreditsBlock from "../components/CreditsBlock.js";
import Bios from "../components/Bios.js";
import ResponsiveHeroImage from "../components/ResponsiveHeroImage.js";
import { scroller } from "react-scroll";
// import { data } from "../data.js";
import { Person, Show, groupPeopleByShow, ShowKeys, showNames } from "../data.js";
import "../App.scss";

const Program = ({data}: {data: Person[]}) => {
  const scrollToBio = (name: string) => scroller.scrollTo(name, {});
  const peopleByShow = groupPeopleByShow(data);

  const showInfo = [] as Show[];
  for (const show in peopleByShow) {
    const showName = showNames[show as ShowKeys];
    const credits = peopleByShow[show as ShowKeys];
    const showData = {
      [show as ShowKeys]: {
        showName: showName,
        credits: credits,
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
            <CreditsBlock show={show}  />
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