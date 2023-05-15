const ItemModalStyle = () => {
  return {
    position: "absolute" as "absolute",
    top: "50%",
    left: "60%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    border: "2px solid #a6e9c8",
    boxShadow: 22,
    borderRadius: 5,
    p: 4,

    ".buy__modal": {
      color: "white",
      fontWeight: 600,
    },

    ".buy__btn__yes": {
      backgroundColor: "#a6e9c8",
      padding: "2% 3%",
      borderRadius: "20px",
      fontWeight: "600",
      fontSize: "0.9vw",
      marginRight: "0.5vw",
    },

    ".buy__question": {
      textAlign: "center",
      fontSize: "1.2vw",
    },

    ".buy__btn__no": {
      backgroundColor: "#a6e9c8",
      padding: "2% 3%",
      borderRadius: "20px",
      fontWeight: "600",
      fontSize: "0.9vw",
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
    },
    ".right__arrow": {
      margin: "10px",
    },
  };
};

export default ItemModalStyle;
