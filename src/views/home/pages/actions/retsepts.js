import { Box, CircularProgress, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Select, Space, Modal, Input } from "antd";
const { TextArea } = Input;

export default function Retsepts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [imageLink, setImageLink] = useState({ image: "", id: "" });
  const [addImageLink, setAddImageLink] = useState({ image: "", id: "" });

  const [submiting, setSubmiting] = useState(false);
  const [category, setCategory] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const [relatedCategory, setRelatedCategory] = React.useState([]);
  const [name, setName] = useState("");
  const [nameRu, setNameRu] = useState("");
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [editData, setEditData] = useState(null);
  const location = useLocation();
  const [categoryData, setCategoryData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [imageData2, setImageData2] = useState([]);
  const [addHandleImageData, setAddHandleImageData] = useState([
    {
      id: 0,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);
  const [errorCategory, setErrorCategory] = useState(false);
  const [selectImage, setSelectImage] = useState("");
  const [delID, setDelId] = useState([]);
  const [imgtrue, setImgtrue] = useState(false);

  const showModal = (url, id) => {
    setIsModalOpen(true);
    setImageLink({ image: url, id: id });
  };
  const showModalAdd = (url, id) => {
    setIsModalOpenAdd(true);
    setAddImageLink({ image: url, id: id });
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleDeleteImageApi = (id) => {
    setIsModalOpen(false);
    const data = imageData2.filter((el) => el.id !== id);
    setImageData2(data);
    if (imageData.find((el) => el.id === id)) {
      delID.push(id);
    }
  };

  const handleChangeRelatedCategory = (event) => {
    setRelatedCategory(event);
  };
  const handleChangeActive = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    setCategory(event);
    setErrorCategory(false);
  };

  const addImageInput = (e) => {
    setImageData2([...imageData2, { id: e }]);
  };
  const addImageInputPost = (e) => {
    setAddHandleImageData([...addHandleImageData, { id: e }]);
  };

  const setImageUrlUpdate = (url, id) => {
    // setIsModalOpen(false);
    if (url) {
      setImageLink({ image: window.URL.createObjectURL(url), id: id });
      for (let i = 0; i < imageData2.length; i++) {
        if (imageData2[i].id === id) {
          Object.assign(imageData2[i], {
            image: window.URL.createObjectURL(url),
            imageUrl: url,
          });
        }
      }
    }
  };

  const setImageUrlAdd = (url, id) => {
    setImgtrue(false)
    if (url) {
      setSelectImage(url);
      setAddImageLink({ image: window.URL.createObjectURL(url), id: id });

      for (let i = 0; i < addHandleImageData.length; i++) {
        if (addHandleImageData[i].id === id) {
          Object.assign(addHandleImageData[i], {
            image: window.URL.createObjectURL(url),
            imageUrl: url,
          });
        }
      }
    }
  };

  const handleDeleteImageAddApi = (id) => {
    const data = addHandleImageData.filter((el) => el.id !== id);
    setAddHandleImageData(data);
    setIsModalOpenAdd(false);
  };
console.log('addHandleImageData', selectImage, imgtrue);
  const handleSubmitAddRecipe = async (e) => {
    e.preventDefault();
    if (
      category !== ""
       && selectImage !== "" 
    ) {
      if (category !== "") {
        setErrorCategory(false);
      } else if (selectImage !== '') {
        setImgtrue(false)
      }
      const formData = new FormData();
      formData.append("title_uz", name);
      formData.append("title_ru", nameRu);
      formData.append("description_uz", description);
      formData.append("description_ru", descriptionRu);
      formData.append("category", category);
      formData.append("is_active", checked);
      formData.append("type", location.search.split("?")[1]);
      if (relatedCategory) {
        formData.append("related_categories", relatedCategory);
      }
      for (let i = 0; i < addHandleImageData.length; i++) {
        if (addHandleImageData[i]?.imageUrl) {
          formData.append("uploaded_images", addHandleImageData[i].imageUrl);
        }
      }

      setSubmiting(true);
      await Client.post(API_ENDPOINTS.CAREATE_RECIPE, formData)
        .then((data) => {
          toast.success("Retsep muvaffaqiyatli qo'shildi");
          setTimeout(() => {
            navigate("/retsepts");
          }, 300);
        })
        .catch((err) => {
          toast.error("Xatolik! Qayta urinib ko'ring");
        });

      setSubmiting(false);
      document.querySelector(".create-branch-form").reset();
    } else {
      if (category === "") {
        setErrorCategory(true);
      }
      if (selectImage === "") {
        setImgtrue(true)
      }
    }
  };

  const handleEditItemRecipe = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_uz", name);
    formData.append("title_ru", nameRu);
    formData.append("description_uz", description);
    formData.append("description_ru", descriptionRu);
    formData.append("category", category);
    formData.append("is_active", checked);
    if (relatedCategory?.length > 0) {
      formData.append("related_categories", relatedCategory);
    }
    for (let i = 0; i < imageData2?.length; i++) {
      if (imageData2[i]?.imageUrl) {
        formData.append("uploaded_images", imageData2[i]?.imageUrl);
      }
    }
    for (let i = 0; i < delID?.length; i++) {
      formData.append("deleted_image", delID[i]);
    }
    setSubmiting(true);

    await Client.patch(
      `${API_ENDPOINTS.UPDATE_RECIPE}${location.search.split("?")[2]}/`,
      formData
    )
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli tahrirlandi");
        setTimeout(() => {
          navigate("/retsepts");
        }, 300);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
      });
    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getCategory = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES_CHAILD}?type=${e}`)
      .then((resp) => {
        // setData(resp.results);
        setCategoryData(
          resp.results?.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  const getItem = async () => {
    await Client.get(
      API_ENDPOINTS.DETAIL_RECIPE + location.search.split("?")[2]
    )
      .then((res) => {
        if (res?.type === "bistro") {
          getCategory("bistro");
        } else if (res?.type === "byuti") {
          getCategory("byuti");
        }
        setEditData(res);
        setName(res?.title_uz);
        setNameRu(res?.title_ru);
        setDescription(res?.description_uz);
        setDescriptionRu(res?.description_ru);
        setCategory(res?.category);
        setChecked(res?.is_active);
        setImageData(res?.recipe_gallery);
        setImageData2(res?.recipe_gallery);

        setRelatedCategory(res?.related_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (location.search.split("?")[1] === "edit") {
      getItem();
    }
    if (location.search.split("?")[1] === "bistro") {
      getCategory("bistro");
    } else if (location.search.split("?")[1] === "byuti") {
      getCategory("byuti");
    }
    // eslint-disable-next-line
  }, []);

  return location.search.split("?")[1] === "edit" ? (
    editData ? (
      <div className="bg--color px-2 py-3">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] pb-3">Retsiptni tahrirlash</h1>
            <Link to="/retsepts">
              <Button
                variant="contained"
                color="info"
                size="large"
                startIcon={<ArrowBackIcon />}
              >
                Orqaga
              </Button>
            </Link>
          </div>
          <Toaster />
          <div>
            <form
              onSubmit={handleEditItemRecipe}
              className="w-2/3 m-auto row colorr p-3 create-branch-form"
            >
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <span className="label--name font-bold">Kategoriyalar</span>
                <Select
                  mode="select"
                  placeholder="Kategoriya *"
                  showSearch
                  allowClear
                  required
                  defaultValue={category}
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  className={`${
                    errorCategory ? "rounded-md border border-rose-500" : ""
                  }`}
                  options={categoryData}
                />
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                <span className="label--name font-bold">
                  Bog'liq kategoriyalar
                </span>

                <Space
                  style={{
                    width: "100%",
                  }}
                  direction="vertical"
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    placeholder="Bog'liq kategoriyalar"
                    onChange={handleChangeRelatedCategory}
                    options={categoryData}
                    defaultValue={relatedCategory}
                  />
                </Space>
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="row">
                  <div className="col-12">
                    <span className="label--name font-bold">Nomi</span>
                    <Input
                      placeholder="Nomi"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <span className="label--name font-bold">Izoh</span>
                    <TextArea
                      rows={12}
                      placeholder="Izoh"
                      required
                      value={description}
                      type="text"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="row">
                  <div className="col-12">
                    <span className="label--name font-bold">Nomi (ru) </span>
                    <Input
                      placeholder="Название"
                      type="text"
                      required
                      value={nameRu}
                      onChange={(e) => {
                        setNameRu(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <span className="label--name font-bold">Izoh (ru)</span>
                    <TextArea
                      rows={12}
                      placeholder="Комментарий"
                      required
                      value={descriptionRu}
                      type="text"
                      onChange={(e) => {
                        setDescriptionRu(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <span className="label--name font-bold">
                  {" "}
                  Galleriya uchun rasmlar
                </span>
                <div style={{ display: "flex ", gap: "10px" }}>
                  <div
                    className="flex gap-3 flex-wrap"
                    style={{ minWidth: "520px" }}
                  >
                    {imageData2.map((item, i) => {
                      return (
                        <>
                          {item.image ? (
                            <div
                              onClick={() => showModal(item?.image, item.id)}
                              style={{
                                width: ` ${item?.image ? "243px" : "150px"}`,
                                backgroundImage: `url(${
                                  item?.image ? item?.image : ""
                                })`,
                                backgroundSize: "cover",
                                height: ` ${item?.image ? "243px" : "120px"}`,
                                borderRadius: "5px",
                              }}
                            ></div>
                          ) : (
                            <div
                              onClick={() =>
                                item.image
                                  ? showModal(item?.image, item.id)
                                  : console.log("rasm yoq")
                              }
                              style={{
                                maxWidth: "150px",
                                width: "150px",
                                backgroundImage: `url(${
                                  item?.image ? item?.image : ""
                                })`,
                                backgroundSize: "cover",
                                height: "120px",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid #ccc",
                                position: "relative",
                              }}
                            >
                              {item.image ? (
                                ""
                              ) : (
                                <i
                                  className="fa-regular fa-image"
                                  style={{ fontSize: "35px" }}
                                ></i>
                              )}
                              {item?.image ? (
                                " "
                              ) : (
                                <input
                                  style={{
                                    opacity: "0",
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                    bottom: "0",
                                    right: "0",
                                  }}
                                  onChange={(e) =>
                                    setImageUrlUpdate(
                                      e?.target?.files[0],
                                      item.id
                                    )
                                  }
                                  type="file"
                                />
                              )}
                            </div>
                          )}

                          <Modal
                            title="Retsept Galleriyasi"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            cancelText="Yopish"
                            okButtonProps={{ style: { display: "none" } }}
                          >
                            <div
                              style={{
                                maxWidth: "800px",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  backgroundImage: `url(${
                                    imageLink?.image ? imageLink?.image : ""
                                  })`,
                                  backgroundSize: "cover",
                                  minHeight: "500px",
                                  height: "100%",
                                  borderRadius: "5px",
                                }}
                              ></div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "end",
                                  gap: "10px",
                                }}
                              >
                                <div
                                  onClick={() =>
                                    handleDeleteImageApi(imageLink?.id)
                                  }
                                  className=" cursor-pointer py-1.5 px-2 bg-red-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                >
                                  O'chirish
                                </div>
                                <label className=" cursor-pointer py-1.5 px-2 bg-green-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                                  Qo'shish
                                  <input
                                    style={{
                                      display: "none",
                                    }}
                                    onChange={(e) =>
                                      setImageUrlUpdate(
                                        e?.target?.files[0],
                                        imageLink.id
                                      )
                                    }
                                    type="file"
                                  />
                                </label>
                              </div>
                            </div>
                          </Modal>
                        </>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Fab
                      onClick={() => addImageInput(imageData2.length + 1)}
                      color="primary"
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <span className="label--name font-bold"> Aktiv</span>
                <Switch
                  checked={checked}
                  onChange={handleChangeActive}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>

              <Button
                variant="outlined"
                size="large"
                type="submit"
                disabled={submiting}
              >
                {submiting ? "Saqlanmoqda" : "Saqlash"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <Box
        sx={{
          display: "flex",
          wdith: "100%",
          justifyContent: "center",
          padding: "150px 0",
        }}
      >
        <CircularProgress />
      </Box>
    )
  ) : (
    <div className="bg--color px-2 py-3">
      <div>
        <h1 className="text-[35px] pb-3">Retsept qo'shish</h1>
        <Toaster />
        <div className="flex gap-5">
          <form
            onSubmit={handleSubmitAddRecipe}
            className="w-2/3 m-auto row colorr p-2 py-3 create-branch-form"
          >
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <span className={`label--name font-bold ${errorCategory ? 'text-danger' : ''}`}>Kategoriya</span>
              <Select
                mode="select"
                placeholder="Kategoriya *"
                showSearch
                allowClear
                required={true}
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                className={`${
                  errorCategory ? "rounded-md border border-rose-500" : ""
                }`}
                options={categoryData}
              />
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
              <span className="label--name font-bold">
                Bog'liq kategoriyalar
              </span>

              <Space
                style={{
                  width: "100%",
                  textAlign: "left",
                }}
                direction="vertical"
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  placeholder="Bog'liq kategoriyalar"
                  onChange={handleChangeRelatedCategory}
                  options={categoryData}
                />
              </Space>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <span className="label--name font-bold">Nomi *</span>
              <Input
                placeholder="Nomi"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <span className="label--name font-bold">Nomi (ru) *</span>
              <Input
                placeholder="Название"
                type="text"
                required
                value={nameRu}
                onChange={(e) => {
                  setNameRu(e.target.value);
                }}
              />
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3">
              <span className="label--name font-bold">Izoh</span>
              <TextArea
                rows={6}
                placeholder="Izoh"
                value={description}
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3">
              <span className="label--name font-bold">Izoh (ru) </span>
              <TextArea
                rows={6}
                placeholder="Комментарий"
                value={descriptionRu}
                type="text"
                onChange={(e) => {
                  setDescriptionRu(e.target.value);
                }}
              />
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3">
              <span className={`label--name font-bold ${imgtrue ? 'text-danger' : ''} `}>
                {" "}
                Galleriya uchun rasmlar *
              </span>
              <div style={{ display: "flex ", justifyContent: "start" }}>
                <div
                  className="flex gap-3 flex-wrap"
                  style={{ minWidth: "520px" }}
                >
                  {addHandleImageData.map((item, i) => {
                    return (
                      <>
                        <div
                          onClick={() =>
                            item.image
                              ? showModalAdd(item?.image, item.id)
                              : console.log("rasm yoq")
                          }
                          style={{
                            width: ` ${item?.image ? "250px" : "150px"}`,
                            backgroundImage: `url(${
                              item?.image ? item?.image : ""
                            })`,
                            backgroundSize: "cover",
                            height: `${item?.image ? "250px" : "120px"}`,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: `${false ? "7px" : "5px"}`,
                            position: "relative",
                          }}
                        >
                          {item.image ? (
                            ""
                          ) : (
                            <i
                              className="fa-regular fa-image"
                              style={{ fontSize: "35px" }}
                            ></i>
                          )}
                          {item?.image ? (
                            " "
                          ) : (
                            <input
                              style={{
                                opacity: "0",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                bottom: "0",
                                right: "0",
                              }}
                              onChange={(e) =>
                                setImageUrlAdd(e?.target?.files[0], item.id)
                              }
                              type="file"
                            />
                          )}
                        </div>

                        <Modal
                          title="Retsept Galleriyasi"
                          open={isModalOpenAdd}
                          // onOk={handleOk}
                          onCancel={handleCancelAdd}
                          cancelText="Yopish"
                          okButtonProps={{ style: { display: "none" } }}
                        >
                          <div
                            style={{
                              maxWidth: "800px",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                backgroundImage: `url(${
                                  addImageLink?.image ? addImageLink?.image : ""
                                })`,
                                backgroundSize: "cover",
                                minHeight: "500px",
                                height: "100%",
                                borderRadius: "5px",
                              }}
                            ></div>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "end",
                                gap: "10px",
                              }}
                            >
                              <div
                                onClick={() =>
                                  handleDeleteImageAddApi(addImageLink?.id)
                                }
                                className=" cursor-pointer py-1.5 px-2 bg-red-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                              >
                                O'chirish
                              </div>
                              <label className=" cursor-pointer py-1.5 px-2 bg-green-500 mt-2 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                                Qo'shish
                                <input
                                  style={{
                                    display: "none",
                                  }}
                                  onChange={(e) =>
                                    setImageUrlAdd(
                                      e?.target?.files[0],
                                      addImageLink.id
                                    )
                                  }
                                  type="file"
                                />
                              </label>
                            </div>
                          </div>
                        </Modal>
                      </>
                    );
                  })}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Fab
                    onClick={() =>
                      addImageInputPost(addHandleImageData.length + 1)
                    }
                    color="primary"
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                </div>
              </div>
            </div>

            <div className="col-12">
              <span className="label--name font-bold"> Aktiv</span>
              <Switch
                checked={checked}
                onChange={handleChangeActive}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>

            <Button
              variant="outlined"
              size="large"
              type="submit"
              disabled={submiting}
            >
              {submiting ? "Qo'shilmoqda" : "Qo'shish"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
