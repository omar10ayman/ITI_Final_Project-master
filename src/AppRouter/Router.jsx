import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavigationBar } from "../Components/NavBar/Navbar";
import HotelDetials from "../Pages/HotelDetails/HotelDetials";
import Account from "../Pages/accountFlow/Account/accountPage";
import { Footer } from "../Components/Footer/Footer";
import SearchContextProvider from "../store/searchStore";
import BookingDetails from "../Pages/BookingDetails/BookingDetails";
import AccountHistoryLayout from "../Layout/AccountHistoryLayout";
import AccountFlights from "../Components/accountFlow/AccountHistory/AccountHistory";
import AccountStays from "../Components/accountFlow/accountStays/AccountStays";
import { Suspense, lazy } from "react";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllCities from "../Pages/AllCities/AllCities";
import NotFound from "../Pages/notFound/notFound";
import AccountPayment from "../Components/accountFlow/AccountPayment/AccountPayment";
import AccountLayout from "../Layout/accountLayout";
import CountryHotelsPage from "../Pages/CountryHotels/AddHotels";
import CountryHotelsProvider from "../store/store";
import { Favourites } from "../Pages/Favourites/Favourites.jsx";
import BookedTicketFinalDetailsPage from "../Pages/BookedTicketFinalDetails/BookedTicketFinalDetails.jsx";
import AllCititesAirports from "../Pages/allCititesAirports/allCititesAirports.jsx";
import AddFlightCard from "../Components/addFlight/addFlight.jsx";
const AppRouter = () => {
  async function delayForDemo(promise) {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }

  let LandingLazy = lazy(() =>
    delayForDemo(import("../Pages/Landing/LandingPage"))
  );
  let AccountLayoutLazy = lazy(() =>
    delayForDemo(import("../Layout/accountLayout.jsx"))
  );

  let HotelDetialsLazy = lazy(() =>
    delayForDemo(import("../Pages/HotelDetails/HotelDetials.jsx"))
  );

  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center LoaderParent">
          <div className="loader"></div>
        </div>
      }
    >
      <BrowserRouter>
        <SearchContextProvider>
          <NavigationBar />
          <CountryHotelsProvider>
            <Routes>
              <Route
                path="bookingDetails/:hotelId/finalDetails/:bookId"
                element={<BookedTicketFinalDetailsPage />}
              />
              <Route path="/" element={<LandingLazy />} />
              <Route path="login" element={<Login />} />
              <Route path="signUp" element={<SignUp />} />
              <Route
                path="bookingDetails/:hotelId"
                element={<BookingDetails />}
              />

              <Route path="account/:id" element={<AccountLayoutLazy />}>
                <Route index={true} element={<Account />} />

                <Route path="history" element={<AccountHistoryLayout />}>
                  {/* <Route index={true} element={<AccountFlights />} /> */}
                  <Route path="stays" element={<AccountStays />} />
                </Route>
                <Route path="payment" element={<AccountPayment />} />
              </Route>
              <Route path="allcities" element={<AllCities />} />
              <Route path="CountryAirports" element={<AllCititesAirports />} />
              <Route path="CountryAirports/:cityTitle" element={<AddFlightCard />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="CountryHotels/:countryTitle"
                element={<CountryHotelsPage />}
              />
              <Route
                path="CountryHotels/:countryTitle/hotelDetials/:id"
                element={<HotelDetialsLazy />}
              />
              <Route path="Favourites" element={<Favourites />} />
            </Routes>
            <Footer />
          </CountryHotelsProvider>
        </SearchContextProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
