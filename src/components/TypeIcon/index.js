import bug from '../../assets/svg/bug.svg'
import dark from '../../assets/svg/dark.svg'
import dragon from '../../assets/svg/dragon.svg'
import electric from '../../assets/svg/electric.svg'
import fairy from '../../assets/svg/fairy.svg'
import fighting from '../../assets/svg/fighting.svg'
import fire from '../../assets/svg/fire.svg'
import flying from '../../assets/svg/flying.svg'
import ghost from '../../assets/svg/ghost.svg'
import grass from '../../assets/svg/grass.svg'
import ground from '../../assets/svg/ground.svg'
import ice from '../../assets/svg/ice.svg'
import normal from '../../assets/svg/normal.svg'
import poison from '../../assets/svg/poison.svg'
import psychic from '../../assets/svg/psychic.svg'
import rock from '../../assets/svg/rock.svg'
import steel from '../../assets/svg/steel.svg'
import water from '../../assets/svg/water.svg'

function TypeIcon(props) {

  const iconMap = {
    bug: <img src={bug}/>,
    dark: <img src={dark}/>,
    dragon: <img src={dragon}/>,
    electric: <img src={electric}/>,
    fairy: <img src={fairy}/>,
    fighting: <img src={fighting}/>,
    fire: <img src={fire}/>,
    flying: <img src={flying}/>,
    ghost: <img src={ghost}/>,
    grass: <img src={grass}/>,
    ground: <img src={ground}/>,
    ice: <img src={ice}/>,
    normal: <img src={normal}/>,
    poison: <img src={poison}/>,
    psychic: <img src={psychic}/>,
    rock: <img src={rock}/>,
    steel: <img src={steel}/>,
    water: <img src={water}/>
  };

  return (
    <>
      {iconMap[props.type]}
    </>
  );

}
export default TypeIcon;