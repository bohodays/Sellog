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
      fontFamily: "Slackey",
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
    },
    ".slash": {
      fontWeight: "900",
      position: "absolute",
      left: "38%",
      color: "red",
    },
  };
};

export default ItemModalStyle;
