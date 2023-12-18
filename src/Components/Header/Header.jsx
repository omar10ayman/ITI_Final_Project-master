import "./header.css";
import bgImg from "./pexels-asad-photo-maldives-1268855.jpg";
import  SearchForm  from "../SearchForm/SearchForm";
export const Header = () => {
  return (
    <>
      <header
        className="headerParent "
        style={{
          background: `linear-gradient(to left,rgba(0, 0, 50, 0.0), rgba(0, 0, 50, 0.5)),url(${bgImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="headerContent container d-flex   align-items-center h-75  ">
          <div className="content ">
            <h2 className="text-white display-4 ">
              Make Your Travel <br /> Wish List , We'll do <br /> The Rest{" "}
            </h2>
            <h4 className="text-white ">special Offer to suit your Plan</h4>
          </div>
        </div>
      </header>
      <SearchForm />
    </>
  );
};
