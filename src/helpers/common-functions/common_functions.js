import { ReactionzAPIClient } from "../api_helper";
import * as url from "../reactionz_url_helper";
import { site } from "../../config";
import { isEmpty, map } from "lodash";
import { FormConstants } from "../../Components/constants/form-constants/FormConstants";

const api = new ReactionzAPIClient();

export const getAllPaginatedResponseFromReactionz = async (
  requestedItem,
  identifier
) => {
  let loop = true;
  let collectedItems = [];
  var theResponse = [];
  var path;
  switch (requestedItem.toLowerCase()) {
    case "users":
      path = url.LIST_USERS;
      break;
    case "contacts":
      path = url.LIST_CONTACTS;
      break;
    case "channels":
      path = url.LIST_CHANNELS;
      break;
    case "contact channels":
      //path = url.LIST_CONTACT_CHANNELS;
      path = `${url.LIST_CONTACT_CHANNELS}/id:${identifier}/channels`;
      break;
    case "message templates":
      path = url.LIST_CONTACT_CHANNELS;
      break;
    case "custom fields":
      path = url.LIST_CUSTOM_FIELDS;
      break;
  }

  //api.get(url.LIST_USERS);
  var response;
  while (loop) {
    if (requestedItem.toLowerCase() === "contacts") {
      response = await api.create(path, {
        filter: { $and: [] },
        search: "",
        timezone: "Asia/Kuala_Lumpur",
      });
    } else {
      response = await api.get(path);
    }
    if (
      response &&
      response.items &&
      response.items.length &&
      response.items.length > 0
    ) {
      collectedItems = [...collectedItems, ...response.items];

      if (response.pagination.next != null) {
        path = response.pagination.next.substring(
          response.pagination.next.indexOf(path)
        );
        loop = true;
      } else {
        loop = false;
      }
      response.items = collectedItems;
      theResponse = response;
    } else {
      loop = false;
    }
  }

  return theResponse;
};

export const getFileExtension = (fileName) => {
  fileName = reverseString(fileName);
  return reverseString(fileName.slice(0, fileName.indexOf(".")));
};

const reverseString = (str) => {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split(""); // var splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"

  //Step 4. Return the reversed string
  return joinArray; // "olleh"
};

// File.prototype.convertToBase64 = function(callback){
//     var reader = new FileReader();
//     reader.onloadend = function (e) {
//         callback(e.target.result, e.target.error);
//     };
//     reader.readAsDataURL(this);
// };

// export const convertToBase64 = (callback, file) => {
//     var reader = new FileReader();
//     reader.onloadend = function (e) {
//         callback(e.target.result, e.target.error);
//     };
//     reader.readAsDataURL(file);
// };

// export const convertToBase64 = (file, callback) => {
//     let reader = new FileReader();
//     reader.onload = function () {
//         let base64String = reader.result
//             .replace("data:", "")
//             .replace(/^.+,/, "");

//         let imageBase64Stringsep = base64String;

//         // alert(imageBase64Stringsep);
//         callback(base64String);
//     };
//     reader.readAsDataURL(file);
// };

export const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const DataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
};

export const formatContactsListForDisplay = (contacts) => {
  const titleList = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var theFormattedContacts = [];
  titleList.forEach((letter) => {
    theFormattedContacts.push({
      title: letter,
      contacts: [
        contacts.items
          .filter(
            (item) =>
              item.firstName.charAt(0).toLowerCase() ===
              letter.toLocaleLowerCase()
          )
          .sort(dynamicSort("firstName")) || [],
      ],
    });
  });
  return theFormattedContacts;
};

export const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const getConversingContactChannelName = (
  conversingContactChannels,
  channelId
) => {
  const channels = conversingContactChannels;
  const identifier = channelId;
  if (
    channels &&
    channels.items &&
    identifier &&
    identifier != null &&
    !isEmpty(identifier)
  ) {
    const channel = channels.items.filter(
      (channel) => channel.id == identifier
    );
    if (!isEmpty(channel)) return channel[0].source;
  }
};

// if (typeof String.prototype.replaceAll === "undefined") {
//     String.prototype.replaceAll = function (match, replace) {
//         return this.replace(new RegExp(match, "g"), () => replace);
//     };
// }

export const splitAndCapitalize = (s) => {
  let str = s.replaceAll("_", " ");
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = capitalize(splitStr[i]);

    //splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
  //return s && s[0].toUpperCase() + s.slice(1);
};

export const joinAndCapitalize = (s) => {
  var splitStr = s.toLowerCase().split("_");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = capitalize(splitStr[i]);

    //splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined strings
  return splitStr.join("");
  //return s && s[0].toUpperCase() + s.slice(1);
};
export const joinAndCapitalizeModelNames = (s) => {
  var splitStr = s.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = capitalize(splitStr[i]);

    //splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join("");
  //return s && s[0].toUpperCase() + s.slice(1);
};

export const capitalize = (s) => {
  s = s.toLocaleLowerCase();
  return s && s[0].toUpperCase() + s.slice(1);
};

export const restore_table_name = (s) => {
  if (!isEmpty(s)) {
    let table = s.trim().replaceAll(" ", "_");
    return table.toLowerCase();
  }
};

export const enum_to_array = (s) => {
  let str = s.replaceAll("enum('", "").replaceAll("')", "");
  const result = str.split("','");
  return result;
};

export const extract_filters_from_parsed_sql_array = (
  sqlArray,
  filters_list = [],
  relation
) => {
  sqlArray.forEach((element) => {
    let field = "";
    let operator = "";
    let value = "";
    //var relation = "";
    if (Array.isArray(element)) {
      if (!Array.isArray(element[0])) {
        field = element[0];
        operator = element[1]["value"]; //FormConstants.FILTER_CONDITIONS.OPERATORS.label[]
        value = element[2];
      } else {
        //relation = element[1]["value"];
        //console.log("relation: ", element[1]["value"]);
        extract_filters_from_parsed_sql_array(element, filters_list, relation);
      }
    } else {
      relation = element["value"];
    }
    //console.log("relation: ", relation);
    if (!isEmpty(field)) {
      if (isEmpty(filters_list)) {
        filters_list.push({
          field,
          operator,
          value,
          relation: null,
        });
      } else {
        filters_list.push({
          field,
          operator,
          value,
          relation,
        });
      }
    }
  });
};

export const clean_filters_after_extraction = (filters) => {
  let _filters_list = [];
  filters.map((item) => {
    let _operator = item.operator;
    let _value = item.value;
    if (item.value[0] == "%") {
      _operator = "LIKE %...";
      _value = item.value.slice(1);
    } else if (item.value[item.value.length - 1] == "%") {
      _operator = "LIKE ...%";
      _value = item.value.slice(0, item.value.length - 2);
    }
    let _opr = FormConstants.FILTER_CONDITIONS.OPERATORS.filter(
      (operator) => operator.value == _operator
    );
    const list_item = {
      field: item.field,
      operator: _opr[0].label,
      value: _value,
      relation: item.relation,
    };
    _filters_list.push(list_item);
  });
  return _filters_list;
};

export const enum_to_select_options = (val) => {
  let arr = enum_to_array(val);
  let options = [];
  arr.forEach((element) => {
    options.push({ label: element, value: element });
  });
  return options;
};

export const reference_to_select_options = (val) => {
  //let arr = enum_to_array(val);
  let options = [];
  // arr.forEach((element) => {
  //   options.push({ label: element, value: element });
  // });
  for (const [key, value] of Object.entries(val["values"])) {
    options.push({ label: value, value: key });
  }
  return options;
};

export const extract_field_values_to_select_options = (schema, field) => {
  let the_field = schema.filter((element) => element.Field == field);
  if (!isEmpty(the_field)) {
    if (the_field[0].Key.toLowerCase().includes("mul")) {
      return reference_to_select_options(the_field[0]);
    } else if (the_field[0].Type.toLowerCase().includes("enum")) {
      return enum_to_select_options(the_field[0].Type);
    } else {
      return [];
    }
  }
};

export const capitalizeString = (str, splitchar = "_") => {
  var val = "";
  if (!isEmpty(str)) {
    var splitStr = str.toLowerCase().split(splitchar);
    splitStr.forEach((element) => {
      val = val + " " + capitalize(element);
    });

    return val;
  }
};

export const changeJoiningChar = (str, splitchar = "_", joiningChar = "-") => {
  var val = "";
  str = str.trim();
  if (!isEmpty(str)) {
    var splitStr = str.split(splitchar);
    splitStr.forEach((element) => {
      isEmpty(val) ? (val = element) : (val = val + joiningChar + element);
    });

    return val;
  }
};
