import React, { useEffect, useState } from "react";
import styles from "./Post.module.css";

import { Avatar, Divider } from "@material-ui/core";
import QRCode from "qrcode.react";

import { useSelector } from "react-redux";

import { selectProfiles } from "../auth/authSlice";

import { PROPS_POST } from "../types";

const Post: React.FC<PROPS_POST> = ({
  postId,
  loginId,
  userPost,
  title,
  price,
  imageUrl,
  liked,
}) => {
  const profiles = useSelector(selectProfiles);

  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });
  const [qrData, setQrData] = useState({ title: "", price: "" });
  useEffect(() => {
    setQrData({ title: title, price: price });
  }, [price, title]);
  const sampleData = JSON.stringify(qrData);

  if (title) {
    return (
      <div className={styles.post}>
        <div className={styles.post_header}>
          <Avatar className={styles.post_avatar} src={prof[0]?.img} />
          <h3>{prof[0]?.nickName}</h3>
        </div>
        <img className={styles.post_image} src={imageUrl} alt="" />

        <Divider />
        <div className={styles.post_item}>
          <div className={styles.post_description}>{title}</div>
          <div className={styles.post_description}>価格　{price} xym</div>
          <QRCode
            className={styles.post_qrcode}
            value={sampleData}
            size={128}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            renderAs={"svg"}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default Post;
