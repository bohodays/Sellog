const ItemModalStyle = () => {
  return {
    position: "absolute" as "absolute",
    top: "50%",
    left: "60%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    bgcolor: "black",
    border: "2px solid #a6e9c8",
    boxShadow: 22,
    borderRadius: 5,
    p: 4,

    ".buy__modal": {
      color: "white",
    },

    ".buy__btn__yes": {
      backgroundColor: "#a6e9c8",
      padding: "0.3vw",
      borderRadius: "20px",
      fontWeight: "600",
      fontSize: "0.9vw",
      marginRight: "0.5vw",
      border: "2px solid #a6e9c8",
    },

    ".buy__btn__yes:hover": {
      border: "2px solid hotpink",
    },

    ".buy__question": {
      textAlign: "center",
      fontSize: "1.1vw",
      // fontFamily: "Slackey",
      fontWeight: "600",
    },

    ".buy__btn__no": {
      backgroundColor: "#a6e9c8",
      padding: "0.3vw",
      borderRadius: "20px",
      fontWeight: "600",
      fontSize: "0.9vw",
      border: "2px solid #a6e9c8",
    },

    ".buy__btn__no:hover": {
      border: "2px solid hotpink",
    },

    ".buy__btns__wrapper": {
      textAlign: "end",
    },

    ".buy__modal__coin": {
      height: "4vh",
    },

    ".buy__point": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1vw",
      marginBottom: "1vw",
    },

    ".after__point": {
      fontSize: "1.1vw",
      fontWeight: "600",
    },
    ".right__arrow": {
      margin: "10px",
    },

    ".cur__point": {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },

    ".slash": {
      fontWeight: "900",
      position: "absolute",
      // right: "0.5%",
      color: "red",
    },

    ".lack__msg": {
      // fontFamily: "Voces",
      display: "flex",
      alignItems: "center",
      fontSize: "1.3vw",
      fontWeight: "600",
    },

    ".lack__coin": {
      color: "hotpink",
      margin: "0vw 1vw",
      fontSize: "1.8vw",
    },
  };
};

export default ItemModalStyle;
