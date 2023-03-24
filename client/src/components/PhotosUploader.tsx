import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface Props {
  photoLink: string;
  setValues: Dispatch<SetStateAction<Places>>;
  values: Places;
  addedPhotos: string[];
}

const PhotosUploader = ({
  photoLink,
  setValues,
  values,
  addedPhotos,
}: Props) => {
  const handleLinkUpload = async () => {
    await axios
      .post("/upload-by-link", { link: photoLink })
      .then(({ data }) => {
        console.log(data);
        setValues({
          ...values,
          addedPhotos: [...addedPhotos, data],
          photoLink: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadPhoto = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files) return;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    console.log(data);

    await axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(({ data }) => {
        console.log(data);
        setValues({
          ...values,
          addedPhotos: [...addedPhotos, ...data],
          photoLink: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteImage = (name: string) => {
    console.log(name);
    let result = addedPhotos.filter((photo) => photo !== name);
    axios
      .delete(`/uploads/${name}`)
      .then(({ data }) => {
        console.log(data);
        setValues({ ...values, addedPhotos: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(ev) =>
            setValues({ ...values, photoLink: ev.target.value })
          }
          className="input-primary"
          placeholder="Add using a link ...jpg"
        />
        <button
          onClick={handleLinkUpload}
          className=" bg-gray-200 px-4 rounded-2xl"
        >
          Add photo
        </button>
      </div>
      <div className="mt-2 grid gap-5 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, i) => {
            return (
              <div key={i} className="relative">
                <img
                  src={"http://localhost:8000/uploads/" + link}
                  alt="upload image"
                  className=" h-40 w-60 object-cover bg-gray-200 rounded-2xl"
                />
                <button
                  className=" absolute top-2 right-2 z-20 bg-white rounded-full"
                  onClick={() => handleDeleteImage(link)}
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        <label className="cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex justify-center items-center gap-1 h-40">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(ev) => uploadPhoto(ev)}
          />
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
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
