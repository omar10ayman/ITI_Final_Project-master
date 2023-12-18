const DestnationInput = ({ searchData, setSeachData, CheckTranScript }) => {
  return (
    <>
      <input
        onChange={(e) =>
          setSeachData({ ...searchData, destination: e.target.value })
        }
        type="text"
        placeholder="Istanbul,Turkey"
        className="input"
        value={CheckTranScript()}
        list='browsers'
        id="myBrowser"
        name="myBrowser"
      />
      <datalist id="browsers">
        <option value="istanbul" />
        <option value="cairo" />
        <option value="paris" />
        <option value="rome" />
        <option value="london" />
      </datalist>
    </>
  );
};
export default DestnationInput;
