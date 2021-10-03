import React, { useState } from "react";
import { HandleClickEvent } from "./HandleClickEvent";
import FileMenuButton from "./MenuButton";
import { useDispatch } from 'react-redux'
import { checkRecentlyViewed } from "../../actions/fileAction";
import { detectViewedFile } from "../../actions/fileAction";
import {
  HiOutlineFolderRemove,
  HiOutlineLink,
  HiOutlineShare,
} from "react-icons/hi/index";
import { BsDownload, BsCheckBox } from "react-icons/bs/index";
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineStar,
} from "react-icons/ai/index";
import { RiDeleteBinLine, RiErrorWarningLine } from "react-icons/ri/index";
import { GrCut } from "react-icons/gr/index";
import { FiCopy } from "react-icons/fi/index";
import AudioPreview from "../AudioPreview/index";
import VideoPreview from "../VideoPreview/Index";
import ImagePreview from "../ImagePreview/index";
import Preview from "../Preview/Preview";
import Modal from "./DeleteToBinModal";

import axios from "axios";
import FileDownload from "js-file-download";

function FileMenu({ file, openStatus, setOpenStatus, type }) {
  const [openPreview, setOpenPreview] = useState(false);
  const [deleteToBin, setDeleteToBin] = useState(false);
  const dispatch = useDispatch()

  function previewCmd() {
    setOpenPreview(true);
    dispatch(checkRecentlyViewed(file._id))
    console.log('file',file)
  }

  function getLink() {
    navigator.clipboard.writeText(file.url);
    alert("Link Copied to clipboard!");
  }

  function download() {
    axios({
      url: file.url,
      method: "GET",
      responseType: "blob"
    })
    .then(res => FileDownload(res.data, file.fileName))
    .catch(err => alert(`Unable to download: ${file.fileName}, some error just occured!`))
  }

  function share() {}

  function select() {}

  function copy() {}

  function cut() {}

  function moveTo() {}

  function addStar() {}

  function rename() {}

  function properties() {
    dispatch(checkRecentlyViewed(file._id))
  }

  function deleteCmd() {
    setDeleteToBin(true);
  }

  const preview = (id) => {
    axios
    .post("https://companyfiles.zuri.chat/api/v1/files/preview/" + id)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
    console.log('preview file id', file._id);
  }

  return (
    <>
      <HandleClickEvent
        show={openStatus}
        onClickOutside={() => {
          setOpenStatus(false);
        }}
      >
        <div className="tw-bg-white tw-py-3 tw-w-60 tw-absolute tw-left-5 tw-z-20">
          <FileMenuButton name="Preview" cmd={previewCmd}>
            <AiOutlineEye
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="preview"
            />
          </FileMenuButton>
          
          <FileMenuButton name="Get link" cmd={getLink}>
            <HiOutlineLink
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="link"
            />
          </FileMenuButton>

          <FileMenuButton name="Download" cmd={download}>
            <BsDownload
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="download"
            />
          </FileMenuButton>
          <FileMenuButton name="Share" cmd={share}>
            <HiOutlineShare
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="share"
            />
          </FileMenuButton>
          <FileMenuButton name="Select" cmd={select}>
            <BsCheckBox
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="selct"
            />
          </FileMenuButton>
          <FileMenuButton name="Copy" cmd={copy}>
            <FiCopy
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="copy"
            />
          </FileMenuButton>
          <FileMenuButton name="Cut" cmd={cut}>
            <GrCut
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="cut"
            />
          </FileMenuButton>
          <FileMenuButton name="Move to" cmd={moveTo}>
            <HiOutlineFolderRemove
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="move"
            />
          </FileMenuButton>
          <FileMenuButton name="Add to starred" cmd={addStar}>
            <AiOutlineStar
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="star"
            />
          </FileMenuButton>
          <FileMenuButton name="Rename" cmd={rename}>
            <AiOutlineEdit
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="title"
            />
          </FileMenuButton>
          <FileMenuButton name="Properties" cmd={properties}>
            <RiErrorWarningLine
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="properties"
            />
          </FileMenuButton>
          <FileMenuButton name="Delete" cmd={deleteCmd}>
            <RiDeleteBinLine
              className="tw-mr-3 tw-flex tw-self-center tw-text-xl"
              title="delete"
            />
          </FileMenuButton>
        </div>

        {openPreview ? (
          type === "audio" ? (
            <AudioPreview file={file} setOpenStatus={setOpenStatus} />
          ) : type === "video" ? (
            <VideoPreview file={file} setOpenStatus={setOpenStatus} />
          ) : type === "image" ? (
            <ImagePreview file={file} setOpenStatus={setOpenStatus} />
          ) : type === "pdf" || "word" || "powerpoint" || "excel" || "txt" ? (
            <Preview file={file} setOpenStatus={setOpenStatus} />
          ) : (
            <div>
              <p>Can't preview this file</p>
            </div>
          )
        ) : null}
        {deleteToBin && (
          <Modal
            deleteToBin={deleteToBin}
            setDeleteToBin={setDeleteToBin}
            id={file._id}
            fileName={file.fileName}
          />
        )}
      </HandleClickEvent>
    </>
  );
}

export default FileMenu;
