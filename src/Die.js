import Dot from "./Dot";
import "./styles.css";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  };

  const renderDot = (value) => {
    switch (value) {
      case 1:
        return <Dot dotClass="dot1" />;
      case 2:
        return (
          <>
            <Dot dotClass="dot1" />
            <Dot dotClass="dot2" />
          </>
        );

      case 3:
        return (
          <>
            <Dot dotClass="dot1" />
            <Dot dotClass="dot2" />
            <Dot dotClass="dot3" />
          </>
        );

      case 4:
        return (
          <>
            <Dot dotClass="dot1" />
            <Dot dotClass="dot2" />
            <Dot dotClass="dot3" />
            <Dot dotClass="dot4" />
          </>
        );

      case 5:
        return (
          <>
            <Dot dotClass="dot1" />
            <Dot dotClass="dot2" />
            <Dot dotClass="dot3" />
            <Dot dotClass="dot4" />
            <Dot dotClass="dot5" />
          </>
        );

      case 6:
        return (
          <>
            <Dot dotClass="dot1" />
            <Dot dotClass="dot2" />
            <Dot dotClass="dot3" />
            <Dot dotClass="dot4" />
            <Dot dotClass="dot5" />
            <Dot dotClass="dot6" />
          </>
        );

      default:
        null;
    }
  };

  let dots = [];
  for (let i = 0; i < 6; i++) {
    dots.push(<Dot key={i} dotClass={`dot${i}`} />);
  }

  let dieClassName = `die-face die-${props.value}`;

  return (
    <div className={dieClassName} style={styles} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
      {renderDot(props.value)}
    </div>
  );
}
