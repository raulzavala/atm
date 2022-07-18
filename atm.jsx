const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  console.log(isValid);
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return isDeposit == "" ? (
    <div></div>
  ) : (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        width="200"
        value="Submit"
        disabled={isValid}
        id="submit-input"
      ></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState("");
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Balance $ ${totalState}`;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    console.log("taget" + Number(event.target.value));
    console.log(totalState);
    if (Number(event.target.value) > 0) {
      setValidTransaction(false);
    } else {
      if (Number(event.target.value) < totalState) {
        setValidTransaction(false);
      }

      if (totalState < 0) {
        setValidTransaction(true);
      }
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    if(deposit==0){
        alert('The amount is invalid!');
    }else{
        if(totalState>deposit && isDeposit=="Cash Back"){
            alert("The amount for cash back is greater than the balance amount");
        }
    }

    let newTotal =
    atmMode == "Deposit" ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if (event.target.value === "Deposit") {
      setIsDeposit("Deposit");
    } else {
      if (event.target.value === "Cash Back") {
        setIsDeposit("Cash Back");
      }
    }
    event.preventDefault();
  };

  return (
    <div id="principal">
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Please select your transaction type: </label>
        <div id="secundario">
        <select
          onChange={(e) => handleModeSelect(e)}
          name="mode"
          id="mode-select"
        >
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        </div>
        <ATMDeposit
          onChange={handleChange}
          isDeposit={isDeposit}
          isValid={validTransaction}
        ></ATMDeposit>
      </form>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
