import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Perks, PhotosUploader, Places } from "../components";

const PlacesPage = () => {
  const { action } = useParams();
  const navigation = useNavigate();
  const [values, setValues] = useState<Places>({
    title: "",
    address: "",
    addedPhotos: [],
    photoLink: "",
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
  });

  const {
    title,
    addedPhotos,
    address,
    perks,
    photoLink,
    checkIn,
    checkOut,
    extraInfo,
    description,
    maxGuests,
  } = values;

  function inputHeader(text: string) {
    return <h2 className=" text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text: string) {
    return <h2 className="text-gray-500">{text}</h2>;
  }

  function preInput(header: string, description: string) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    await axios
      .post("/places", values)
      .then(({ data }) => {
        console.log(data);
        navigation("/profile/places");
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <div className="">
      {action !== "new" && (
        <div className=" flex flex-col">
          <Places />
          <Link to="/profile/places/new" className=" self-center">
            <button className="btn-primary inline-flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              Add New
            </button>
          </Link>
        </div>
      )}
      {action === "new" && (
        <form
          onSubmit={(ev) => handleSubmit(ev)}
          className="flex flex-col gap-4 w-full container mx-auto lg:max-w-6xl mt-10 px-5 md:px-10"
        >
          {preInput(
            "Title",
            "Title for your place. should be small and catchy as in advertisement"
          )}
          <input
            type="text"
            value={title}
            onChange={(ev) => setValues({ ...values, title: ev.target.value })}
            className="input-primary"
            placeholder="title, for example: My lovely apt"
          />
          <h2 className="text-2xl mt-4">Address</h2>
          <p className="text-sm  text-gray-500">Address to this place</p>
          <input
            type="text"
            value={address}
            onChange={(ev) =>
              setValues({ ...values, address: ev.target.value })
            }
            className="input-primary"
            placeholder="address"
          />
          {preInput("Photos", "more = better")}
          <PhotosUploader
            addedPhotos={addedPhotos}
            photoLink={photoLink}
            setValues={setValues}
            values={values}
          />
          {preInput("Description", "Description of this place")}
          <textarea
            value={description}
            onChange={(ev) =>
              setValues({ ...values, description: ev.target.value })
            }
            rows={6}
            className=""
            placeholder=""
          />
          {preInput("Perks", "select all the perks")}
          <Perks perks={perks} values={values} setValues={setValues} />
          {preInput("Extra info", "house rules, etc.")}
          <textarea
            value={extraInfo}
            onChange={(ev) =>
              setValues({ ...values, extraInfo: ev.target.value })
            }
            rows={6}
          />
          {preInput(
            "Check in & out times, max guests",
            "  add check in and out times, remember to have some time window for cleaning the room between guests"
          )}
          <div className=" grid gap-2 sm:grid-cols-3 checkin">
            <div>
              <h3 className=" mt-2 mb-1">Check in time</h3>
              <input
                value={checkIn}
                onChange={(ev) =>
                  setValues({ ...values, checkIn: ev.target.value })
                }
                type="text"
                placeholder="14"
              />
            </div>
            <div>
              <h3 className=" mt-2 mb-1">Check out time</h3>
              <input
                value={checkOut}
                onChange={(ev) =>
                  setValues({ ...values, checkOut: ev.target.value })
                }
                type="text"
                placeholder="11"
              />
            </div>
            <div>
              <h3 className=" mt-2 mb-1">Max number of guests</h3>
              <input
                value={maxGuests}
                onChange={(ev) =>
                  setValues({ ...values, maxGuests: Number(ev.target.value) })
                }
                type="number"
              />
            </div>
          </div>
          <div className="">
            <button type="submit" className="btn-primary my-4">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PlacesPage;
