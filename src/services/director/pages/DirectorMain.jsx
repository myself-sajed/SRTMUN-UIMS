import React from "react";
import Header from "../components/UtilityComponents/Header";
import navcom from "../components/UtilityComponents/navcom";
import { useSelector } from "react-redux";
import title from "../../../js/title";


function DirectorMain() {
  title('SDM | School Data Management')
  const directorActive = useSelector(state => state.directorActive.directorActive)
  return (<>
    <Header />
    {
      navcom?.map((item) => {
        return item.name === directorActive ? <div key={item}>{item.element}</div> : null
      })}

  </>)
}
export default DirectorMain;