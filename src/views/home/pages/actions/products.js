import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flex, Input, Modal, Select, Space } from "antd";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Switch from "@mui/material/Switch";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import AddInput from "components/shared/addInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextArea from "antd/es/input/TextArea";
import Test from "./test";
import AddInputThree from "components/shared/addInputThree";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [imageLink, setImageLink] = useState({ image: "", id: "" });
  const [addImageLink, setAddImageLink] = useState({ image: "", id: "" });
  const [delID, setDelId] = useState([]);
  const [imageData, setImageData] = useState([]);

  const [submiting, setSubmiting] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [editData, setEditData] = useState(null);
  const location = useLocation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [buyCost, setBuyCost] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(null);
  const [on_sale, setOn_sale] = React.useState(false);
  const [carbohydrates, setCarbohydrates] = React.useState(0);
  const [ingredients, setingredients] = React.useState("");
  const [fats, setFats] = React.useState(0);
  const [kilocalories, setKilocalories] = React.useState(0);
  const [manufacturer, setManufacturer] = React.useState("");
  const [protein, setProtein] = React.useState(0);
  const [storageConditions, setStorageConditions] = React.useState("");
  const [specification, setSpecification] = React.useState("");
  const [shelf_life, setShelf_life] = React.useState("");
  const [branchData, setBranchsData] = React.useState(null);
  const [product_categories, setProduct_categories] = React.useState([]);
  const [image, setImage] = useState("");
  const [imageData2, setImageData2] = useState([]);
  const [addHandleImageData, setAddHandleImageData] = useState([
    {
      id: 0,
    },
  ]);
  const [filialInput, setFilialInput] = useState([
    {
      id: 1,
      branch: "",
      quantity: 1,
    },
  ]);
  const [atributInput, setAtributInput] = useState([
    {
      id: 1,
      content_uz: "",
      content_ru: "",
      order: "",
    },
  ]);

 
  const [nameRu, setNameRu] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [ingredientsRu, setIngredientsRu] = useState("");
  const [specificationRu, setSpecificationRu] = useState("");
  const [manufacturerRu, setManufacturerRu] = useState("");
  const [shelf_lifeRu, setShelf_lifeRu] = useState("");
  const [storageConditionsRu, setStorageConditionsRu] = useState("");
  const navigate = useNavigate();

  const showModalAdd = (url, id) => {
    setIsModalOpenAdd(true);
    setAddImageLink({ image: url, id: id });
  };
  const showModal = (url, id) => {
    setIsModalOpen(true);
    setImageLink({ image: url, id: id });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const setImageUrlAdd = (url, id) => {
    if (url) {
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

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleChangeSelect = (value) => {
    setProduct_categories(value);
  };
  const handleChangeActiveShop = (event) => {
    setOn_sale(event.target.checked);
  };

  const addImageInput = (e) => {
    setAddHandleImageData([...addHandleImageData, { id: e }]);
  };

  const addImageInputUpdate = (e) => {
    setImageData2([...imageData2, { id: e }]);
  };

  const addFilialInput = (value, id) => {
    let findItem = filialInput.find((elem) => elem.id === id);
    findItem.branch = Number(value?.branch);
    findItem.quantity = value?.quantity;
    setFilialInput([...filialInput]);
  };

  const addProductHighlightInput = (value, id) => {
    let findItem = atributInput.find((elem) => elem.id === id);
    findItem.content_uz = value?.content_uz;
    findItem.content_ru = value?.content_ru;
    findItem.order = value?.order;
    setAtributInput([...atributInput]);
  };

  const deleteIDHighlight = (i) => {
    setAtributInput(atributInput.filter((item) => item?.id !== i));
  };

  const deleteID = (i) => {
    setFilialInput(filialInput.filter((item) => item.id !== i));
  };

  const addFormInput = (value, id) => {
    setFilialInput([...filialInput, { id, ...value }]);
  };

  const addAtributInput = async (value, id) => {
    setAtributInput([...atributInput, { id, ...value }]);
  };

  const handleDeleteImageApi = (id) => {
    setIsModalOpen(false);
    const data = imageData2.filter((el) => el.id !== id);
    setImageData2(data);
    if (imageData.find((el) => el.id === id)) {
      delID.push(id);
    }
  };

  const setImageUrlUpdate = (url, id) => {
    setImageLink({ image: window.URL.createObjectURL(url), id: id });
    for (let i = 0; i < imageData2.length; i++) {
      if (imageData2[i].id === id) {
        Object.assign(imageData2[i], {
          image: window.URL.createObjectURL(url),
          imageUrl: url,
        });
      }
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_branch = filialInput?.map((item) => {
      const { branch, quantity } = item;

      return { branch, quantity };
    });

    const product_highlight = atributInput?.map((item) => {
      const { content_uz, content_ru, order } = item;
      return { content_uz, content_ru, order };
    });

    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("product_galereya", image[i]);
    }

    const formData1 = new FormData();
    formData1.append(
      "product_attribute",
      JSON.stringify({
        carbohydrates: carbohydrates,
        ingredients_uz: ingredients,
        ingredients_ru: ingredientsRu,
        fats: fats,
        kilocalories: kilocalories,
        manufacturer_uz: manufacturer,
        manufacturer_ru: manufacturerRu,
        protein: protein,
        storageConditions_uz: storageConditions,
        storageConditions_ru: storageConditionsRu,
        specification_uz: specification,
        specification_ru: specificationRu,
        shelf_life_uz: shelf_life,
        shelf_life_ru: shelf_lifeRu,
      })
    );
    formData1.append("name_uz", name);
    formData1.append("name_ru", nameRu);
    formData1.append("price", price);
    formData1.append("original_price", buyCost);
    formData1.append("description_uz", description);
    formData1.append("description_ru", descriptionRu);
    if (discount === "" || discount === null) {
      formData1.append("discount", 0);
    } else {
      formData1.append("discount", discount);
    }
    formData1.append("on_sale", on_sale);
    formData1.append("product_categories", JSON.stringify(product_categories));

    if (
      product_highlight?.every(
        (el) => el.content_uz !== "" && el.content_uz && el.order
      ) &&
      product_highlight?.every(
        (el) => el.order !== "" && el.content_uz && el.order
      )
    ) {
      formData1.append("product_highlight", JSON.stringify(product_highlight));
    }
    if (
      product_branch?.every(
        (el) => el.branch !== "" && el.branch && el.quantity
      ) &&
      product_branch?.every(
        (el) => el.branch !== 0 && el.branch && el.quantity
      ) &&
      product_branch?.every(
        (el) => el.quantity !== "" && el.branch && el.quantity
      )
    ) {
      formData1.append("product_count_branch", JSON.stringify(product_branch));
    }

    formData1.append("type", location.search.split("?")[1]);
    for (let i = 0; i < addHandleImageData?.length; i++) {
      if (addHandleImageData[i].imageUrl) {
        formData1.append("product_galereya", addHandleImageData[i].imageUrl);
      }
    }

    await Client.post(API_ENDPOINTS.CREATE_PRODUCT, formData1)
      .then((data) => {
        toast.success("Retsep muvaffaqiyatli qo'shildi");
        navigate("/products");
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };


  const handleSubmitAddVariant = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_branch = filialInput?.map((item) => {
      const { branch, quantity } = item;
      return { branch, quantity };
    });

    const product_highlight = atributInput?.map((item) => {
      const { content_uz, content_ru, order } = item;
      return { content_uz, content_ru, order };
    });

    const formData1 = new FormData();
    formData1.append(
      "product_attribute",
      JSON.stringify({
        carbohydrates: carbohydrates,
        ingredients: ingredients,
        fats: fats,
        kilocalories: kilocalories,
        manufacturer: manufacturer,
        protein: protein,
        storageConditions: storageConditions,
        specification: specification,
        shelf_life: shelf_life,
      })
    );
    if (!product_categories?.[0]?.label) {
      formData1.append(
        "product_categories",
        JSON.stringify(product_categories)
      );
    } else {
      const arr = product_categories?.map((el) => el.value);
      formData1.append("product_categories", JSON.stringify(arr));
    }
    formData1.append("name", name);
    formData1.append("price", price);
    formData1.append("original_price", buyCost);
    formData1.append("description", description);
    if (discount === "" || discount === null) {
      formData1.append("discount", 0);
    } else {
      formData1.append("discount", discount);
    }
    formData1.append("on_sale", on_sale);
    formData1.append("variant_id", location.search.split("?")[4]);
    if (delID?.length > 0) {
      formData1.append("variant_images", JSON.stringify(delID));
    } else {
      formData1.append(
        "variant_images",
        JSON.stringify(imageData?.map((el) => el.id))
      );
    }

    if (
      product_highlight?.every(
        (el) => el.content_uz !== "" && el.content_uz && el.order
      ) &&
      product_highlight?.every(
        (el) => el.order !== "" && el.content_uz && el.order
      )
    ) {
      formData1.append("product_highlight", JSON.stringify(product_highlight));
    }
    if (
      product_branch?.every(
        (el) => el.branch !== "" && el.branch && el.quantity
      ) &&
      product_branch?.every(
        (el) => el.branch !== 0 && el.branch && el.quantity
      ) &&
      product_branch?.every(
        (el) => el.quantity !== "" && el.branch && el.quantity
      )
    ) {
      formData1.append("product_count_branch", JSON.stringify(product_branch));
    }

    formData1.append("type", location.search.split("?")[1]);
    for (let i = 0; i < imageData2?.length; i++) {
      if (imageData2[i].imageUrl) {
        formData1.append("product_galereya", imageData2[i].imageUrl);
      }
    }

    await Client.post(`${API_ENDPOINTS.CREATE_PRODUCT}`, formData1)
      .then((data) => {
        toast.success("Mahsulotdan muvaffaqiyatli variant yaratildi");
        navigate("/products");
        setSubmiting(false);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    document.querySelector(".create-branch-form").reset();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const product_branch = filialInput?.map((item) => {
      const { branch, quantity } = item;
      return { branch, quantity };
    });
    const product_highlight = atributInput?.map((item) => {
      const { content_uz, content_ru, order } = item;
      return { content_uz, content_ru , order };
    });

    const formData1 = new FormData();
    formData1.append(
      "product_attribute",
      JSON.stringify({
        carbohydrates: carbohydrates,
        ingredients_uz: ingredients,
        ingredients_ru: ingredientsRu,
        fats: fats,
        kilocalories: kilocalories,
        manufacturer_uz: manufacturer,
        manufacturer_ru: manufacturerRu,
        protein: protein,
        storageConditions_uz: storageConditions,
        storageConditions_ru: storageConditionsRu,
        specification_uz: specification,
        specification_ru: specificationRu,
        shelf_life_uz: shelf_life,
        shelf_life_ru: shelf_lifeRu,
      })
    );
    formData1.append("name_uz", name);
    formData1.append("name_ru", nameRu);
    formData1.append("price", price);
    formData1.append("original_price", buyCost);
    formData1.append("description", description);
    if (discount === "" || discount === null) {
      formData1.append("discount", 0);
    } else {
      formData1.append("discount", discount);
    }
    formData1.append("on_sale", on_sale);
    if (!product_categories?.[0]?.label) {
      formData1.append(
        "product_categories",
        JSON.stringify(product_categories)
      );
    }

    if (
      product_highlight?.every(
        (el) => el.content_uz !== "" && el.content_uz && el.order && el.content_ru
      ) &&
      product_highlight?.every(
        (el) => el.order !== "" && el.content_uz && el.order && el.content_ru
      ) &&
      product_highlight?.every(
        (el) => el.content_ru !== "" && el.content_uz && el.order && el.content_uz
      )
    ) {
      formData1.append("product_highlight", JSON.stringify(product_highlight));
    }
    if (
      product_branch?.every(
        (el) => el.branch !== "" && el.branch && el.quantity
      ) &&
      product_branch?.every(
        (el) => el.branch !== 0 && el.branch && el.quantity
      ) &&
      product_branch?.every(
        (el) => el.quantity !== "" && el.branch && el.quantity
      )
    ) {
      formData1.append("product_count_branch", JSON.stringify(product_branch));
    }

    formData1.append("type", location.search.split("?")[1]);
    for (let i = 0; i < imageData2?.length; i++) {
      if (imageData2[i].imageUrl) {
        formData1.append("product_galereya", imageData2[i].imageUrl);
      }
    }
    if (delID?.length > 0) {
      formData1.append("deleted_image", JSON.stringify(delID));
    }

    await Client.patch(
      `${API_ENDPOINTS.PATCH_PRODUCT}${location.search.split("?")[3]}/`,
      formData1
    )
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli saqlandi");
        navigate("/products");
        setSubmiting(false);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    document.querySelector(".create-branch-form").reset();
  };

  const getCategory = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES_CHAILD}?type=${e}`)
      .then((resp) => {
        setCategoryList(
          resp.results?.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  const getBranchData = async () => {
    await Client.get(API_ENDPOINTS.GET_BRANCHS)
      .then((res) => {
        setBranchsData(res?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getItem = async () => {
    await Client.get(
      API_ENDPOINTS.DETAIL_PRODUCT + location.search.split("?")[3]
    )
      .then((res) => {
        setEditData(res);
        setImageData(
          res?.product_galereya?.map((el, i) => ({
            image: el.image_url,
            id: el.id,
          }))
        );
        setImageData2(
          res?.product_galereya?.map((el, i) => ({
            image: el.image_url,
            id: el.id,
          }))
        );
        setAtributInput(
          res?.product_highlight
            ? res?.product_highlight?.map((el, i) => ({
                content_uz: el?.content_uz,
                content_ru: el?.content_ru,
                order: el?.order,
                id: i + 1,
              }))
            : atributInput
        );

        setFilialInput(
          res?.product_count_branch
            ? res?.product_count_branch?.map((el, i) => ({
                branch: el?.branch,
                quantity: el?.quantity,
                id: i + 1,
              }))
            : filialInput
        );

        setProduct_categories(
          res?.product_categories?.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        );

        setName(res?.name_uz);
        setNameRu(res?.name_ru);
        setOn_sale(res?.on_sale);
        setDiscount(res?.discount);
        setDescription(res?.description_uz);
        setDescriptionRu(res?.description_ru);
        setPrice(JSON.parse(res?.price));
        setBuyCost(JSON.parse(res?.original_price));
        setDiscount(res?.discount);
        setCarbohydrates(res?.product_attribute?.carbohydrates);
        setingredients(res?.product_attribute?.ingredient_uz);
        setIngredientsRu(res?.product_attribute?.ingredients_ru);
        setFats(res?.product_attribute?.fats);
        setKilocalories(res?.product_attribute?.kilocalories);
        setManufacturer(res?.product_attribute?.manufacturer_uz);
        setManufacturerRu(res?.product_attribute?.manufacturer_ru);
        setProtein(res?.product_attribute?.protein);
        setStorageConditions(res?.product_attribute?.storageConditions_uz);
        setStorageConditionsRu(res?.product_attribute?.storageConditions_ru);
        setSpecification(res?.product_attribute?.specification_uz);
        setSpecificationRu(res?.product_attribute?.specification_ru);
        setShelf_life(res?.product_attribute?.shelf_life_uz);
        setShelf_lifeRu(res?.product_attribute?.shelf_life_ru);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBranchData();
  }, []);

  useEffect(() => {
    if (
      location.search.split("?")?.[2] === "edit" ||
      location.search.split("?")?.[2] === "addVariant"
    ) {
      getItem();
    }
    if (location.search.split("?")[1] === "bistro") {
      getCategory("bistro");
    } else if (location.search.split("?")[1] === "byuti") {
      getCategory("byuti");
    }
    // eslint-disable-next-line
  }, []);

  const change = () => {
    const product_highlight = atributInput?.map((item) => {
      const { content, order } = item;
      return { content, order };
    });
  };

  const prosent = (e) => {
    return (price * discount) / 100;
  };

  return location.search.split("?")?.[2] === "edit" ? (
    // Mahsulotni tahrirlash
    editData ? (
      <div className="flex gap-2 bg--color px-2 py-3 ">
        <div className="w-2/3">
          <h1 className="text-[28px] pb-4">Mahsulotni tahrirlash</h1>
          <Toaster />
          <div className="w-full">
            <form
              onSubmit={handleSubmitEdit}
              className=" flex flex-col gap-4 create-branch-form"
            >
              <div className="colorr p-4">
                <div className="row">
                  <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="row">
                      <div className="col-6">
                        <span className="label--name font-bold">Nomi</span>
                        <Input
                          style={{
                            height: "35px",
                          }}
                          placeholder="Nomi"
                          type="text"
                          className="py-2"
                          defaultValue={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Nomi(ru)
                        </span>
                        <Input
                          placeholder="Название "
                          type="text"
                          value={nameRu}
                          className="py-2"
                          style={{
                            height: "35px",
                          }}
                          onChange={(e) => {
                            setNameRu(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
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
                        defaultValue={product_categories}
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
                        onChange={handleChangeSelect}
                        options={categoryList}
                      />
                    </Space>
                  </div>
                  <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div class="row">
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Sotiladigan narx *
                        </span>
                        <Input
                          style={{
                            height: "35px",
                          }}
                          placeholder="Narxi"
                          type="number"
                          value={price}
                          className="py-2"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (
                              inputValue === "" ||
                              (+inputValue <= 50000000 && +inputValue > 0)
                            ) {
                              if (
                                inputValue.includes(",") ||
                                inputValue.includes(".")
                              ) {
                                const sanitizedValue = e.target.value.replace(
                                  /[,\.]/g,
                                  ""
                                );
                                setPrice(sanitizedValue);
                              } else {
                                setPrice(inputValue);
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Sotib olingan narx *
                        </span>
                        <Input
                          style={{
                            height: "35px",
                          }}
                          placeholder="Narxi"
                          type="number"
                          value={buyCost}
                          className="py-2"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (
                              inputValue === "" ||
                              (+inputValue <= 50000000 && +inputValue > 0)
                            ) {
                              if (
                                inputValue.includes(",") ||
                                inputValue.includes(".")
                              ) {
                                const sanitizedValue = e.target.value.replace(
                                  /[,\.]/g,
                                  ""
                                );
                                setPrice(sanitizedValue);
                              } else {
                                setPrice(inputValue);
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <span className="label--name font-bold">
                      Chegirmasi ( % )
                    </span>
                    <Input
                      style={{
                        height: "35px",
                      }}
                      placeholder="Chegirmasi ( % )"
                      type="number"
                      value={discount}
                      className="py-2"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (
                          inputValue === "" ||
                          (+inputValue <= 100 && +inputValue >= 0)
                        ) {
                          if (
                            inputValue.includes(",") ||
                            inputValue.includes(".")
                          ) {
                            const sanitizedValue = e.target.value.replace(
                              /[,\.]/g,
                              ""
                            );
                            setDiscount(sanitizedValue);
                          } else {
                            setDiscount(inputValue);
                          }
                        }
                      }}
                    />
                  </div>

                  <div className="col-12 py-2">
                    <div className="row">
                      <div className="col-6">
                        <span className="label--name font-bold">Izoh</span>
                        <Flex vertical gap={32}>
                          <TextArea
                            showCount
                            maxLength={1000}
                            placeholder="Izoh"
                            style={{
                              height: 80,
                              resize: "true",
                            }}
                            defaultValue={editData?.description_uz || description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                        </Flex>
                      </div>
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Izoh (ru){" "}
                        </span>
                        <Flex vertical gap={32}>
                          <TextArea
                            showCount
                            maxLength={1000}
                            placeholder="Комментарий"
                            style={{
                              height: 80,
                              resize: "true",
                            }}
                            defaultValue={
                              editData?.description_ru || descriptionRu
                            }
                            onChange={(e) => {
                              setDescriptionRu(e.target.value);
                            }}
                          />
                        </Flex>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="colorr p-2">
                  <div className="row">
                    <div className="col-12">
                      <h2 className="text-[18px] pl-3.5 py-3 font-bold">
                        {" "}
                        Mahsulot galleriyasi
                      </h2>
                      <div
                        style={{
                          display: "flex ",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                        className="px-3"
                      >
                        <div
                          className="flex gap-3 flex-wrap"
                          style={{ minWidth: "560px" }}
                        >
                          {imageData2.map((item, i) => {
                            return (
                              <>
                                {item.image ? (
                                  <div
                                    onClick={() =>
                                      showModal(item?.image, item.id)
                                    }
                                    style={{
                                      maxWidth: "150px",
                                      width: "150px",
                                      backgroundImage: `url(${
                                        item?.image ? item?.image : ""
                                      })`,
                                      backgroundSize: "cover",
                                      height: "155px",
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
                                            e.target.files[0],
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
                                          imageLink?.image
                                            ? imageLink?.image
                                            : ""
                                        })`,
                                        backgroundSize: "cover",
                                        minHeight: "400px",
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
                                              e.target.files[0],
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

                        <div
                          style={{
                            display: "flex",
                            alignItems: "end",
                            marginLeft: "-35px",
                          }}
                        >
                          <Fab
                            onClick={() =>
                              addImageInputUpdate(imageData2.length + 1)
                            }
                            color="primary"
                            aria-label="add"
                          >
                            <AddIcon />
                          </Fab>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 my-6 colorr">
                  <h2 className="text-[18px] pl-3.5 py-3 font-bold">
                    Mahsulot atributi{" "}
                  </h2>
                  <div className="row border-5 p-3">
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                      <TextField
                        label="Uglevod"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        type="number"
                        defaultValue={carbohydrates}
                        onChange={(e) => {
                          setCarbohydrates(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                      <TextField
                        label="Kaloriya"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        type="number"
                        defaultValue={kilocalories}
                        onChange={(e) => {
                          setKilocalories(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                      <TextField
                        label="Yog' miqdori"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        type="number"
                        defaultValue={fats}
                        onChange={(e) => {
                          setFats(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                      <TextField
                        label="Protien"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        type="number"
                        defaultValue={protein}
                        onChange={(e) => {
                          setProtein(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-6 p-2">
                      <div className="row">
                        <h2 className="text-[18px] py-2 font-bold">Uz</h2>
                        <div className="col-6">
                          <TextField
                            label="Tarkibi"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={
                              editData?.product_attribute?.ingredients_uz ||
                              ingredients
                            }
                            onChange={(e) => {
                              setingredients(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Ishlab chiqaruvchi"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={manufacturer}
                            onChange={(e) => {
                              setManufacturer(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-2">
                      <div className="row">
                        <h2 className="text-[18px] py-2 font-bold">Ru</h2>
                        <div className="col-6">
                          <TextField
                            label="Tarkibi (ru) "
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={
                              editData?.product_attribute?.ingredients_ru ||
                              ingredientsRu
                            }
                            onChange={(e) => {
                              setIngredientsRu(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Ishlab chiqaruvchi (ru)"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={manufacturerRu}
                            onChange={(e) => {
                              setManufacturerRu(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-2">
                      <div className="row">
                        <div className="col-6">
                          <TextField
                            label="Mahsulot soni yoki hajmi"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={specification}
                            onChange={(e) => {
                              setSpecification(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Saqlash muddati"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={shelf_life}
                            onChange={(e) => {
                              setShelf_life(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-2">
                      <div className="row">
                        <div className="col-6">
                          <TextField
                            label="Mahsulot soni yoki hajmi (ru)"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={specificationRu}
                            onChange={(e) => {
                              setSpecificationRu(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Saqlash muddati (ru)"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={shelf_lifeRu}
                            onChange={(e) => {
                              setShelf_lifeRu(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12 p-2">
                      <div className="row">
                        <div className="col-6">
                          <TextField
                            label="Saqlash shartlari"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={storageConditions}
                            onChange={(e) => {
                              setStorageConditions(e.target.value);
                            }}
                            multiline
                            rows={4}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Saqlash shartlari (ru)"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={storageConditionsRu}
                            onChange={(e) => {
                              setStorageConditionsRu(e.target.value);
                            }}
                            multiline
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2 my-4 colorr">
                  <h2 className="text-[18px] pl-3.5 pt-3 font-bold">
                    Mahsulot asosiy elementlari
                  </h2>
                  <div className="flex justify-content-between">
                    <div className="flex flex-col">
                      {atributInput?.map((item, i) => (
                        <AddInputThree
                          dataH={item}
                          key={i}
                          addFilialInput={addProductHighlightInput}
                          id={item.id ? item.id : atributInput[i - 1]?.id + 1}
                          deleteIDHighlight={deleteIDHighlight}
                          change={change}
                        />
                      ))}
                    </div>
                    <div
                      onClick={() =>
                        addAtributInput(
                          { content: "", order: "" },
                          atributInput?.length === 0
                            ? 1
                            : atributInput[atributInput.length - 1].id + 1
                        )
                      }
                      className="p-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <p>
                        <i className="fa-solid fa-circle-plus"></i> qo'shish
                      </p>{" "}
                    </div>
                  </div>
                </div>

                <div className="px-2 my-4 colorr">
                  <h2 className="text-[18px] pl-3.5 pt-3 font-bold">
                    Filiallardagi mahsulot
                  </h2>
                  <div className="flex justify-content-between">
                    <div className="flex flex-col">
                      {filialInput?.map((item, i) => (
                        <AddInput
                          dataF={item}
                          selectData={branchData}
                          key={i}
                          addFilialInput={addFilialInput}
                          id={item.id ? item.id : addFilialInput[i - 1]?.id + 1}
                          deleteID={deleteID}
                          change={change}
                          // setChangeBranchCunt={setChangeBranchCunt}
                          // setChangeBranch={setChangeBranch}
                        />
                      ))}
                    </div>
                    <div
                      onClick={() =>
                        addFormInput(
                          { branch: "", quantity: "" },
                          filialInput?.length === 0
                            ? 1
                            : filialInput[filialInput.length - 1].id + 1
                        )
                      }
                      className="p-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <p>
                        <i className="fa-solid fa-circle-plus"></i> qo'shish
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-normal font-sans text-lg">Sotuvda</label>
                <Switch
                  defaultChecked={editData?.on_sale || on_sale}
                  onChange={handleChangeActiveShop}
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

        <div className="w-1/3 font-sans">
          <div className="text-end mb-3">
            <Link to="/products">
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
          <div className="border rounded p-2.5 colorr">
            <div className="text-center w-full flex justify-center">
              <img
                className="rounded border"
                src={`${
                  imageData2?.[0]?.image
                    ? imageData2?.[0]?.image
                    : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                }`}
                alt="samokat"
              />
            </div>

            <h3
              style={{
                maxWidth: "320px",
                width: "100%",
                fontFamily: "inter",
              }}
              className="text-[18px] text-[#404040] font-serif font-bold text-slate-600"
            >
              {name ? name : editData?.name}{" "}
              <span className=" font-bold text-slate-400">
                {specification ? `${specification}` : ""}
              </span>
            </h3>

            {atributInput?.content !== "" ? (
              <ul>
                {atributInput?.map((item, i) => (
                  <li
                    key={i + 1}
                    className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                  >
                    {" "}
                    <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {editData?.product_highlight?.map((item, i) => (
                  <li
                    key={i + 1}
                    className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                  >
                    {" "}
                    <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            )}

            {description || editData?.description ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Izoh
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {description ? description : editData?.description}
                </p>
              </>
            ) : (
              ""
            )}

            <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
              100 gr uchun :
            </p>
            <div
              className="flex flex-wrap"
              style={{
                maxWidth: "330px",
                width: "100%",
              }}
            >
              {carbohydrates || editData?.product_attribute?.carbohydrates ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {carbohydrates
                      ? carbohydrates
                      : editData?.product_attribute?.carbohydrates}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    uglevod
                  </p>
                </div>
              ) : (
                ""
              )}
              {kilocalories || editData?.product_attribute?.kilocalories ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {kilocalories
                      ? kilocalories
                      : editData?.product_attribute?.kilocalories}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    kaloriya
                  </p>
                </div>
              ) : (
                ""
              )}
              {fats || editData?.product_attribute?.fats ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {fats ? fats : editData?.product_attribute?.fats}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    yog'
                  </p>
                </div>
              ) : (
                ""
              )}

              {protein || editData?.product_attribute?.protein ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {protein ? protein : editData?.product_attribute?.protein}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    protien
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {ingredients || editData?.product_attribute?.ingredients ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-3 max-w-xs">
                  Tarkibi :
                </p>
                <p
                  style={{
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {ingredients
                    ? ingredients
                    : editData?.product_attribute?.ingredients}
                </p>
              </>
            ) : (
              ""
            )}
            {manufacturer || editData?.product_attribute?.manufacturer ? (
              <>
                <p className="text-[13px] mt-2  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Ishlab chiqaruvchi :
                </p>
                <p
                  style={{
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {manufacturer
                    ? manufacturer
                    : editData?.product_attribute?.manufacturer}
                </p>
              </>
            ) : (
              ""
            )}

            {storageConditions ||
            editData?.product_attribute?.storageConditions ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Saqlash shartlari :
                </p>
                <p
                  style={{
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {storageConditions
                    ? storageConditions
                    : editData?.product_attribute?.storageConditions}
                </p>
              </>
            ) : (
              ""
            )}
            {shelf_life || editData?.product_attribute?.shelf_life ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Saqlash muddati :
                </p>
                <p
                  style={{
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {shelf_life
                    ? shelf_life
                    : editData?.product_attribute?.shelf_life}
                </p>
              </>
            ) : (
              ""
            )}
            {discount || price ? (
              <div className="bg-[#3B82F6] my-2 rounded p-2 text-center text-white ">
                {discount ? (
                  <p>
                    {Math.round(price - prosent(discount))} <del>{price}</del>{" "}
                    so'm
                  </p>
                ) : (
                  <>{price} so'm</>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    ) : (
      <></>
    )
  ) : // Mahsulotga variant qoshish
  location.search.split("?")?.[2] === "addVariant" ? (
    editData ? (
      <div className="flex gap-2 bg--color px-2 py-3">
        <div className="w-2/3">
          <h1 className="text-[28px] pb-4">
            {" "}
            <u>
              {editData.name_uz +
                " " +
                (editData?.product_attribute?.specification_uz
                  ? editData?.product_attribute?.specification_uz
                  : "")}
            </u>{" "}
            uchun variant yaratish
          </h1>
          <Toaster />
          <div className="flex gap-5">
            <form
              onSubmit={handleSubmitAddVariant}
              className=" flex flex-col gap-2 create-branch-form"
            >
              <div className="colorr p-4">
                <div className="row">
                  <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="row">
                      <div className="col-6">
                        <span className="label--name font-bold">Nomi</span>
                        <Input
                          style={{
                            height: "35px",
                          }}
                          placeholder="Nomi *"
                          type="text"
                          className="py-2"
                          defaultValue={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Nomi(ru) *
                        </span>
                        <Input
                          placeholder="Название *"
                          type="text"
                          value={nameRu}
                          required
                          className="py-2"
                          style={{
                            height: "35px",
                          }}
                          onChange={(e) => {
                            setNameRu(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
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
                        defaultValue={product_categories}
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
                        onChange={handleChangeSelect}
                        options={categoryList}
                      />
                    </Space>
                  </div>
                  <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="row">
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Sotiladigan narx
                        </span>
                        <Input
                          style={{
                            height: "35px",
                          }}
                          placeholder="Narxi"
                          type="number"
                          value={price}
                          className="py-2"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (
                              inputValue === "" ||
                              (+inputValue <= 50000000 && +inputValue > 0)
                            ) {
                              if (
                                inputValue.includes(",") ||
                                inputValue.includes(".")
                              ) {
                                const sanitizedValue = e.target.value.replace(
                                  /[,\.]/g,
                                  ""
                                );
                                setPrice(sanitizedValue);
                              } else {
                                setPrice(inputValue);
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Sotib olingan narx
                        </span>
                        <Input
                          style={{
                            height: "35px",
                          }}
                          placeholder="Narxi"
                          type="number"
                          value={buyCost}
                          className="py-2"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (
                              inputValue === "" ||
                              (+inputValue <= 50000000 && +inputValue > 0)
                            ) {
                              if (
                                inputValue.includes(",") ||
                                inputValue.includes(".")
                              ) {
                                const sanitizedValue = e.target.value.replace(
                                  /[,\.]/g,
                                  ""
                                );
                                setBuyCost(sanitizedValue);
                              } else {
                                console.log("ishladi", inputValue);
                                setBuyCost(inputValue);
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <span className="label--name font-bold">
                      Chegirmasi ( % )
                    </span>
                    <Input
                      style={{
                        height: "35px",
                      }}
                      placeholder="Chegirmasi ( % )"
                      type="number"
                      value={discount}
                      className="py-2"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (
                          inputValue === "" ||
                          (+inputValue <= 100 && +inputValue >= 0)
                        ) {
                          if (
                            inputValue.includes(",") ||
                            inputValue.includes(".")
                          ) {
                            const sanitizedValue = e.target.value.replace(
                              /[,\.]/g,
                              ""
                            );
                            setDiscount(sanitizedValue);
                          } else {
                            setDiscount(inputValue);
                          }
                        }
                      }}
                    />
                  </div>

                  <div className="col-12 py-2">
                    <div className="row">
                      <div className="col-6">
                        <span className="label--name font-bold">Izoh</span>
                        <Flex vertical gap={32}>
                          <TextArea
                            showCount
                            maxLength={1000}
                            placeholder="Izoh"
                            style={{
                              height: 80,
                              resize: "true",
                            }}
                            defaultValue={editData?.description_uz || description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                        </Flex>
                      </div>
                      <div className="col-6">
                        <span className="label--name font-bold">
                          Izoh (ru){" "}
                        </span>
                        <Flex vertical gap={32}>
                          <TextArea
                            showCount
                            maxLength={1000}
                            placeholder="Комментарий"
                            style={{
                              height: 80,
                              resize: "true",
                            }}
                            defaultValue={
                              editData?.description_ru || descriptionRu
                            }
                            onChange={(e) => {
                              setDescriptionRu(e.target.value);
                            }}
                          />
                        </Flex>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="colorr p-2 mt-4">
                  <div className="row">
                    <div className="col-12">
                      <h2 className="text-[18px] pl-3.5 py-3 font-bold">
                        {" "}
                        Mahsulot galleriyasi
                      </h2>
                      <div
                        style={{
                          display: "flex ",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                        className="px-3"
                      >
                        <div
                          className="flex gap-3 flex-wrap"
                          style={{ minWidth: "560px" }}
                        >
                          {imageData2.map((item, i) => {
                            return (
                              <>
                                {item.image ? (
                                  <div
                                    onClick={() =>
                                      showModal(item?.image, item.id)
                                    }
                                    style={{
                                      maxWidth: "150px",
                                      width: "150px",
                                      backgroundImage: `url(${
                                        item?.image ? item?.image : ""
                                      })`,
                                      backgroundSize: "cover",
                                      height: "155px",
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
                                            e.target.files[0],
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
                                          imageLink?.image
                                            ? imageLink?.image
                                            : ""
                                        })`,
                                        backgroundSize: "cover",
                                        minHeight: "400px",
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
                                              e.target.files[0],
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

                        <div
                          style={{
                            display: "flex",
                            alignItems: "end",
                            marginLeft: "-35px",
                          }}
                        >
                          <Fab
                            onClick={() =>
                              addImageInputUpdate(imageData2.length + 1)
                            }
                            color="primary"
                            aria-label="add"
                          >
                            <AddIcon />
                          </Fab>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 my-6 colorr">
                  <h2 className="text-[18px] pl-3.5 py-3 font-bold">
                    Mahsulot atributi{" "}
                  </h2>
                  <div className="row border-5 p-3">
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                      <TextField
                        label="Uglevod"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        type="number"
                        defaultValue={carbohydrates}
                        onChange={(e) => {
                          setCarbohydrates(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                      <TextField
                        label="Kaloriya"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        type="number"
                        defaultValue={kilocalories}
                        onChange={(e) => {
                          setKilocalories(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                      <TextField
                        label="Yog' miqdori"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        type="number"
                        defaultValue={fats}
                        onChange={(e) => {
                          setFats(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                      <TextField
                        label="Protien"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        type="number"
                        defaultValue={protein}
                        onChange={(e) => {
                          setProtein(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-6 p-2">
                      <div className="row">
                        <h2 className="text-[18px] py-2 font-bold">Uz</h2>
                        <div className="col-6">
                          <TextField
                            label="Tarkibi"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={
                              editData?.product_attribute?.ingredients_uz ||
                              ingredients
                            }
                            onChange={(e) => {
                              setingredients(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Ishlab chiqaruvchi"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={manufacturer}
                            onChange={(e) => {
                              setManufacturer(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-2">
                      <div className="row">
                        <h2 className="text-[18px] py-2 font-bold">Ru</h2>
                        <div className="col-6">
                          <TextField
                            label="Tarkibi (ru) "
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={
                              editData?.product_attribute?.ingredients_ru ||
                              ingredientsRu
                            }
                            onChange={(e) => {
                              setIngredientsRu(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Ishlab chiqaruvchi (ru)"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={manufacturerRu}
                            onChange={(e) => {
                              setManufacturerRu(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-2">
                      <div className="row">
                        <div className="col-6">
                          <TextField
                            label="Mahsulot soni yoki hajmi"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={specification}
                            onChange={(e) => {
                              setSpecification(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Saqlash muddati"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={shelf_life}
                            onChange={(e) => {
                              setShelf_life(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-2">
                      <div className="row">
                        <div className="col-6">
                          <TextField
                            label="Mahsulot soni yoki hajmi (ru)"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={specificationRu}
                            onChange={(e) => {
                              setSpecificationRu(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Saqlash muddati (ru)"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={shelf_lifeRu}
                            onChange={(e) => {
                              setShelf_lifeRu(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12 p-2">
                      <div className="row">
                        <div className="col-6">
                          <TextField
                            label="Saqlash shartlari"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={storageConditions}
                            onChange={(e) => {
                              setStorageConditions(e.target.value);
                            }}
                            multiline
                            rows={4}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Saqlash shartlari (ru)"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            type="text"
                            defaultValue={storageConditionsRu}
                            onChange={(e) => {
                              setStorageConditionsRu(e.target.value);
                            }}
                            multiline
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2 my-4 colorr">
                  <h2 className="text-[18px] pl-3.5 pt-3 font-bold">
                    Mahsulot asosiy elementlari
                  </h2>
                  <div className="flex justify-content-between">
                    <div className="flex flex-col">
                      {atributInput?.map((item, i) => (
                        <AddInputThree
                          dataH={item}
                          key={i}
                          addFilialInput={addProductHighlightInput}
                          id={item.id ? item.id : atributInput[i - 1]?.id + 1}
                          deleteIDHighlight={deleteIDHighlight}
                          change={change}
                        />
                      ))}
                    </div>
                    <div
                      onClick={() =>
                        addAtributInput(
                          { content: "", order: "" },
                          atributInput?.length === 0
                            ? 1
                            : atributInput[atributInput.length - 1].id + 1
                        )
                      }
                      className="p-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <p>
                        <i className="fa-solid fa-circle-plus"></i> qo'shish
                      </p>{" "}
                    </div>
                  </div>
                </div>

                <div className="px-2 my-4 colorr">
                  <h2 className="text-[18px] pl-3.5 pt-3 font-bold">
                    Filiallardagi mahsulot
                  </h2>
                  <div className="flex justify-content-between">
                    <div className="flex flex-col">
                      {filialInput?.map((item, i) => (
                        <AddInput
                          dataF={item}
                          selectData={branchData}
                          key={i}
                          addFilialInput={addFilialInput}
                          id={item.id ? item.id : addFilialInput[i - 1]?.id + 1}
                          deleteID={deleteID}
                          change={change}
                          // setChangeBranchCunt={setChangeBranchCunt}
                          // setChangeBranch={setChangeBranch}
                        />
                      ))}
                    </div>
                    <div
                      onClick={() =>
                        addFormInput(
                          { branch: "", quantity: "" },
                          filialInput?.length === 0
                            ? 1
                            : filialInput[filialInput.length - 1].id + 1
                        )
                      }
                      className="p-3"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                    >
                      <p>
                        <i className="fa-solid fa-circle-plus"></i> qo'shish
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-normal font-sans text-lg">Sotuvda</label>
                <Switch
                  defaultChecked={editData?.on_sale || on_sale}
                  onChange={handleChangeActiveShop}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>

              <Button
                variant="outlined"
                size="large"
                type="submit"
                disabled={submiting}
                color="success"
              >
                {submiting ? "Qo'shilmoqda" : "Variant qo'shish"}
              </Button>
            </form>
          </div>
        </div>

        <div className="w-1/3 font-sans">
          <div className="text-end mb-3">
            <Link to="/products">
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
          <div className="border rounded p-2.5">
            <div className="text-center w-full flex justify-center">
              <img
                className="rounded border"
                src={`${
                  imageData2?.[0]?.image
                    ? imageData2?.[0]?.image
                    : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                }`}
                alt="samokat"
              />
            </div>

            <h3
              style={{
                maxWidth: "320px",
                width: "100%",
                fontFamily: "inter",
              }}
              className="text-[18px] text-[#404040] font-serif font-bold text-slate-600"
            >
              {name ? name : editData?.name}{" "}
              <span className=" font-bold text-slate-400">
                {specification ? specification : ""}{" "}
              </span>
            </h3>

            {atributInput?.content !== "" ? (
              <ul>
                {atributInput?.map((item, i) => (
                  <li
                    key={i + 1}
                    className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                  >
                    {" "}
                    <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {editData?.product_highlight?.map((item, i) => (
                  <li
                    key={i + 1}
                    className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                  >
                    {" "}
                    <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            )}

            {description || editData?.description ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Izoh
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "320px",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {description ? description : editData?.description}
                </p>
              </>
            ) : (
              ""
            )}

            <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
              100 gr uchun :
            </p>
            <div
              className="flex flex-wrap"
              style={{
                maxWidth: "330px",
                width: "100%",
              }}
            >
              {carbohydrates || editData?.product_attribute?.carbohydrates ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {carbohydrates
                      ? carbohydrates
                      : editData?.product_attribute?.carbohydrates}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    uglevod
                  </p>
                </div>
              ) : (
                ""
              )}
              {kilocalories || editData?.product_attribute?.kilocalories ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {kilocalories
                      ? kilocalories
                      : editData?.product_attribute?.kilocalories}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    kaloriya
                  </p>
                </div>
              ) : (
                ""
              )}
              {fats || editData?.product_attribute?.fats ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {fats ? fats : editData?.product_attribute?.fats}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    yog'
                  </p>
                </div>
              ) : (
                ""
              )}

              {protein || editData?.product_attribute?.protein ? (
                <div className="w-1/4 flex flex-col justify-center">
                  <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                    {protein ? protein : editData?.product_attribute?.protein}
                  </span>
                  <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                    protien
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {ingredients || editData?.product_attribute?.ingredients ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-3 max-w-xs">
                  Tarkibi :
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {ingredients
                    ? ingredients
                    : editData?.product_attribute?.ingredients}
                </p>
              </>
            ) : (
              ""
            )}
            {manufacturer || editData?.product_attribute?.manufacturer ? (
              <>
                <p className="text-[13px] mt-2  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Ishlab chiqaruvchi :
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {manufacturer
                    ? manufacturer
                    : editData?.product_attribute?.manufacturer}
                </p>
              </>
            ) : (
              ""
            )}

            {storageConditions ||
            editData?.product_attribute?.storageConditions ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Saqlash shartlari :
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {storageConditions
                    ? storageConditions
                    : editData?.product_attribute?.storageConditions}
                </p>
              </>
            ) : (
              ""
            )}
            {shelf_life || editData?.product_attribute?.shelf_life ? (
              <>
                <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                  Saqlash muddati :
                </p>
                <p
                  style={{
                    maxWidth: "320px",
                    width: "100%",
                  }}
                  className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
                >
                  {shelf_life
                    ? shelf_life
                    : editData?.product_attribute?.shelf_life}
                </p>
              </>
            ) : (
              ""
            )}
            {discount || price ? (
              <div className="bg-[#3B82F6] my-2 rounded p-2 text-center text-white ">
                {discount ? (
                  <p>
                    {Math.round(price - prosent(discount))}{" "}
                    <del>{parseInt(price)}</del> so'm
                  </p>
                ) : (
                  <>{parseInt(price)} so'm</>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    ) : (
      <></>
    )
  ) : (
    // Mahsulot qoshish
    <div className="flex  gap-1 bg--color px-2 py-3">
      <div className="w-2/3">
        <h1 className="text-[35px] pb-2">Mahsulot qo'shish</h1>
        <Toaster />
        {/* <Test/> */}
        <div className="w-full">
          <form
            onSubmit={handleSubmitAdd}
            className="w-full flex flex-col gap-3  create-branch-form border-3"
          >
            <div className="colorr p-4">
              <div className="row">
                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div className="row">
                    <div className="col-6">
                      <span className="label--name font-bold">Nomi *</span>
                      <Input
                        placeholder="Nomi *"
                        type="text"
                        value={name}
                        required
                        className="py-2"
                        style={{
                          height: "35px",
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <span className="label--name font-bold">Nomi(ru) *</span>
                      <Input
                        placeholder="Название *"
                        type="text"
                        value={nameRu}
                        required
                        className="py-2"
                        style={{
                          height: "35px",
                        }}
                        onChange={(e) => {
                          setNameRu(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <span className="label--name font-bold">
                    Bog'liq kategoriyalar
                  </span>
                  <Space
                    className=""
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
                        // height: "40px",
                      }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      placeholder="Bog'liq kategoriyalar"
                      onChange={handleChangeSelect}
                      options={categoryList}
                    />
                  </Space>
                </div>
              </div>
              <div className="row py-3">
                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div class="row">
                    <div className="col-6">
                      <span className="label--name font-bold">
                        Sotiladigan narx *
                      </span>
                      <Input
                        placeholder="Sotiladigan narx *"
                        type="number"
                        maxLength="16"
                        value={price}
                        className="py-2"
                        style={{
                          height: "35px",
                        }}
                        required
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            inputValue === "" ||
                            (parseInt(inputValue) <= 50000000 &&
                              parseInt(inputValue) > 0)
                          ) {
                            if (
                              inputValue.includes(",") ||
                              inputValue.includes(".")
                            ) {
                              const sanitizedValue = e.target.value.replace(
                                /[,\.]/g,
                                ""
                              );
                              setPrice(sanitizedValue);
                            } else {
                              setPrice(inputValue);
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <span className="label--name font-bold">
                        Sotib olingan narx *
                      </span>
                      <Input
                        placeholder="Olingan narx *"
                        type="number"
                        maxLength="16"
                        value={buyCost}
                        className="py-2"
                        style={{
                          height: "35px",
                        }}
                        required
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            inputValue === "" ||
                            (parseInt(inputValue) <= 50000000 &&
                              parseInt(inputValue) > 0)
                          ) {
                            if (
                              inputValue.includes(",") ||
                              inputValue.includes(".")
                            ) {
                              const sanitizedValue = e.target.value.replace(
                                /[,\.]/g,
                                ""
                              );
                              setBuyCost(sanitizedValue);
                            } else {
                              setBuyCost(inputValue);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <span className="label--name font-bold">Chegirma ( % )</span>
                  <Input
                    placeholder="Chegirmasi ( % )"
                    type="number"
                    className="py-2"
                    value={discount}
                    style={{
                      height: "35px",
                    }}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (
                        inputValue === "" ||
                        (parseInt(inputValue) <= 100 &&
                          parseInt(inputValue) >= 0)
                      ) {
                        if (
                          inputValue.includes(",") ||
                          inputValue.includes(".")
                        ) {
                          const sanitizedValue = e.target.value.replace(
                            /[,\.]/g,
                            ""
                          );
                          setDiscount(sanitizedValue);
                        } else {
                          setDiscount(inputValue);
                        }
                      }
                    }}
                  />
                </div>
                <div className="col-12 pt-2">
                  <div className="row">
                    <div className="col-6">
                      <span className="label--name font-bold">Izoh</span>
                      <Flex vertical gap={32}>
                        <TextArea
                          showCount
                          maxLength={1000}
                          placeholder="Izoh"
                          style={{
                            height: 80,
                            resize: "true",
                          }}
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </Flex>
                    </div>
                    <div className="col-6">
                      <span className="label--name font-bold">Izoh (ru)</span>
                      <Flex vertical gap={32}>
                        <TextArea
                          showCount
                          maxLength={1000}
                          placeholder="Комментарий"
                          style={{
                            height: 80,
                            resize: "true",
                          }}
                          value={descriptionRu}
                          onChange={(e) => {
                            setDescriptionRu(e.target.value);
                          }}
                        />
                      </Flex>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{ border: "1px solid #EEEEEE" }}
                className="p-2 colorr"
              >
                <div className="row">
                  <div className="col-12">
                    <h2 className="text-[18px] pl-3.5 py-3 font-bold">
                      {" "}
                      Mahsulot galleriyasi
                    </h2>
                    <div
                      style={{
                        display: "flex ",
                        justifyContent: "space-between",
                        padding: "15px 5px",
                      }}
                      className="px-3"
                    >
                      <div
                        className="flex gap-3 flex-wrap"
                        style={{ minWidth: "490px" }}
                      >
                        {addHandleImageData?.map((item, i) => {
                          return (
                            <>
                              <div
                                key={item.id}
                                onClick={() =>
                                  item.image
                                    ? showModalAdd(item?.image, item.id)
                                    : console.log("rasm yoq")
                                }
                                style={{
                                  maxWidth: "150px",
                                  width: "150px",
                                  backgroundImage: `url(${
                                    item?.image ? item?.image : ""
                                  })`,
                                  backgroundSize: "cover",
                                  height: "155px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
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
                                      setImageUrlAdd(
                                        e?.target?.files[0],
                                        item?.id
                                      )
                                    }
                                    type="file"
                                  />
                                )}
                              </div>

                              <Modal
                                title="Mahsulot Galleriyasi"
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
                                        addImageLink?.image
                                          ? addImageLink?.image
                                          : ""
                                      })`,
                                      backgroundSize: "cover",
                                      minHeight: "400px",
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
                                        handleDeleteImageAddApi(
                                          addImageLink?.id
                                        )
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
                                            addImageLink?.id
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
                            addImageInput(addHandleImageData.length + 1)
                          }
                          color="primary"
                          aria-label="add"
                        >
                          <AddIcon />
                        </Fab>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ border: "1px solid #EEEEEE" }}
                className="p-2 my-6 colorr"
              >
                <h2 className="text-[18px] pl-3.5 py-3 font-bold">
                  Mahsulot atributi{" "}
                </h2>
                <div className=" border-5 row p-3">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                    <TextField
                      label="Uglevod"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      type="number"
                      value={carbohydrates}
                      onChange={(e) => {
                        setCarbohydrates(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                    <TextField
                      label="Kaloriya"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      type="number"
                      value={kilocalories}
                      onChange={(e) => {
                        setKilocalories(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                    <TextField
                      label="Yog' miqdori"
                      variant="outlined"
                      className="w-full"
                      size="small"
                      type="number"
                      value={fats}
                      onChange={(e) => {
                        setFats(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6  p-2">
                    <TextField
                      className="w-full"
                      label="Protien"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={protein}
                      onChange={(e) => {
                        setProtein(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-6 p-2">
                    <h2 className="text-[18px] py-2 font-bold">Uz</h2>
                    <div className="row">
                      <div className="col-6">
                        <TextField
                          label="Tarkibi"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          type="text"
                          value={ingredients}
                          onChange={(e) => {
                            setingredients(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          className="w-full"
                          label="Ishlab chiqaruvchi"
                          variant="outlined"
                          size="small"
                          type="text"
                          required
                          value={manufacturer}
                          onChange={(e) => {
                            setManufacturer(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6 p-2">
                    <div className="row">
                      <h2 className="text-[18px] pl-3.5 py-2 font-bold">Ru</h2>
                      <div className="col-6">
                        <TextField
                          label="Tarkibi (ru)"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          type="text"
                          value={ingredientsRu}
                          onChange={(e) => {
                            setIngredientsRu(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-6">
                        <TextField
                          className="w-full"
                          label="Ishlab chiqaruvchi (ru)"
                          variant="outlined"
                          size="small"
                          type="text"
                          required
                          value={manufacturerRu}
                          onChange={(e) => {
                            setManufacturerRu(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-6 p-2">
                    <div className="row">
                      <div className="col-6">
                        <TextField
                          className="w-full"
                          label="Mahsulot soni yoki hajmi"
                          variant="outlined"
                          size="small"
                          type="text"
                          required
                          value={specification}
                          onChange={(e) => {
                            setSpecification(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          className="w-full"
                          label="Saqlash muddati"
                          variant="outlined"
                          size="small"
                          type="text"
                          value={shelf_life}
                          onChange={(e) => {
                            setShelf_life(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6 p-2">
                    <div className="row">
                      <div className="col-6">
                        <TextField
                          className="w-full"
                          label="Mahsulot soni yoki hajmi (ru)"
                          variant="outlined"
                          size="small"
                          type="text"
                          required
                          value={specificationRu}
                          onChange={(e) => {
                            setSpecificationRu(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          className="w-full"
                          label="Saqlash muddati (ru)"
                          variant="outlined"
                          size="small"
                          type="text"
                          value={shelf_lifeRu}
                          onChange={(e) => {
                            setShelf_lifeRu(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 p-1">
                    <div className="row">
                      <div className="col-6">
                        <TextField
                          className="w-full"
                          label="Saqlash shartlari"
                          variant="outlined"
                          size="small"
                          type="text"
                          required
                          multiline
                          rows={2}
                          value={storageConditions}
                          onChange={(e) => {
                            setStorageConditions(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <TextField
                          className="w-full"
                          label="Saqlash shartlari (ru)"
                          variant="outlined"
                          size="small"
                          type="text"
                          required
                          multiline
                          rows={2}
                          value={storageConditionsRu}
                          onChange={(e) => {
                            setStorageConditionsRu(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-2 my-4 colorr">
                <h2 className="text-[18px] pl-3.5 pt-3 font-bold">
                  Mahsulot asosiy elementlari
                </h2>
                {/* qoshish */}
                <div className="flex justify-content-between">
                  <div className="flex flex-col">
                    {/* {atributInput?.map((item, i) => (
                      <AddInput
                        dataH={item}
                        key={i}
                        addFilialInput={addProductHighlightInput}
                        id={item.id ? item.id : atributInput[i - 1]?.id + 1}
                        deleteIDHighlight={deleteIDHighlight}
                        change={change}
                      />
                    ))} */}
                    {atributInput?.map((item, i) => (
                      <AddInputThree
                        dataH={item}
                        key={i}
                        addFilialInput={addProductHighlightInput}
                        id={item.id ? item.id : atributInput[i - 1]?.id + 1}
                        deleteIDHighlight={deleteIDHighlight}
                        change={change}
                      />
                    ))}
                  </div>

                  <div
                    onClick={() =>
                      addAtributInput(
                        { content: "", order: "" },
                        atributInput.length + 1
                      )
                    }
                    className="p-2"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      cursor: "pointer",
                    }}
                  >
                    <p>
                      <i className="fa-solid fa-circle-plus"></i> qo'shish
                    </p>{" "}
                  </div>
                </div>
              </div>

              <div className="p-2 my-4 colorr">
                <h2 className="text-[18px] pl-3.5 pt-2 font-bold">
                  Filiallardagi mahsulot{" "}
                </h2>
                <div className="flex justify-content-between">
                  <div className="flex flex-col">
                    {filialInput?.map((item, i) => (
                      <AddInput
                        selectData={branchData}
                        key={i}
                        dataF={item}
                        addFilialInput={addFilialInput}
                        id={item.id ? item.id : addFilialInput[i - 1]?.id + 1}
                        deleteID={deleteID}
                      />
                    ))}
                  </div>
                  <div
                    onClick={() =>
                      addFormInput(
                        { branch: "", quantity: "" },
                        filialInput?.length === 0
                          ? 1
                          : filialInput[filialInput.length - 1].id + 1
                      )
                    }
                    className="p-2"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      cursor: "pointer",
                    }}
                  >
                    <p>
                      <i className="fa-solid fa-circle-plus"></i> qo'shish{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="font-bold font-sans text-lg pl-1.5">
                  Sotuvda
                </label>
                <Switch
                  checked={on_sale}
                  onChange={handleChangeActiveShop}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
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

      <div className="w-1/3 font-sans">
        <div className="border rounded px-2 py-3 mt-5  colorr">
          <div className="text-center w-full flex justify-center">
            <img
              className="rounded border"
              src={`${
                addHandleImageData?.[0]?.image
                  ? addHandleImageData?.[0]?.image
                  : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
              }`}
              alt="samokat"
            />
          </div>
          <h3
            style={{
              maxWidth: "320px",
              width: "100%",
              fontFamily: "inter",
            }}
            className="text-[18px] text-[#404040] font-serif font-bold text-slate-600"
          >
            {name ? name : " "}

            <span className=" font-bold text-slate-400 ml-2 ">
              {specification ? `${specification}` : ""}
            </span>
          </h3>

          {atributInput?.content !== "" ? (
            <ul>
              {atributInput?.map((item, i) => (
                <li
                  key={i + 1}
                  className="text-[13px] leading-[18px] font-medium text-slate-600  max-w-xs flex items-baseline gap-2 "
                >
                  {" "}
                  <i className="fa-solid fa-circle text-[3px] text-[#ababab]"></i>{" "}
                  {item.content}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}

          {description ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Izoh
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "320px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {description ? description : ""}
              </p>
            </>
          ) : (
            <></>
          )}
          <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
            100 gr uchun :
          </p>
          <div
            className="flex flex-wrap"
            style={{
              maxWidth: "330px",
              width: "100%",
            }}
          >
            {carbohydrates ? (
              <div className="w-1/5 flex flex-col justify-center">
                <span className="text-[18px] leading-[22px]  text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                  {carbohydrates ? carbohydrates : "..."}
                </span>
                <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                  uglevod
                </p>
              </div>
            ) : (
              ""
            )}
            {kilocalories ? (
              <div className="w-1/5 flex flex-col justify-center">
                <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                  {kilocalories ? kilocalories : "..."}
                </span>
                <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                  kaloriya
                </p>
              </div>
            ) : (
              ""
            )}
            {fats ? (
              <div className="w-1/5 flex flex-col justify-center">
                <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                  {fats ? fats : "..."}
                </span>
                <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                  yog'
                </p>
              </div>
            ) : (
              ""
            )}
            {protein ? (
              <div className="w-1/5 flex flex-col justify-center">
                <span className="text-[18px] leading-[22px] text-center block font-semibold text-[#595959] pt-2 max-w-xs">
                  {protein ? protein : "..."}
                </span>
                <p className="text-[13px] leading-[18px] text-center font-medium text-[#ababab] max-w-xs">
                  protien
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          {ingredients ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Tarkibi :
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "350px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {ingredients ? ingredients : "..."}{" "}
              </p>
            </>
          ) : (
            <></>
          )}
          {manufacturer ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Ishlab chiqaruvchi :
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "320px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {manufacturer ? manufacturer : "..."}{" "}
              </p>
            </>
          ) : (
            <></>
          )}
          {storageConditions ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Saqlash shartlari :
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "320px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {storageConditions ? storageConditions : "..."}{" "}
              </p>
            </>
          ) : (
            <></>
          )}

          {shelf_life ? (
            <>
              <p className="text-[13px]  font-semibold text-[#ababab] leading-[18px] pt-2 max-w-xs">
                Saqlash muddati :
              </p>
              <p
                style={{
                  maxWidth: "320px",
                  width: "320px",
                }}
                className="text-[13px] leading-[18px] font-medium text-slate-600 pb-2 max-w-xs"
              >
                {shelf_life ? shelf_life : "..."}{" "}
              </p>
            </>
          ) : (
            <></>
          )}

          {price ? (
            <div className="bg-[#3B82F6] my-2 rounded p-2 text-center text-white ">
              {discount ? (
                <p>
                  {Math.round(price - prosent(discount))} <del>{price}</del>{" "}
                  so'm{" "}
                </p>
              ) : (
                `${price} so'm`
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
