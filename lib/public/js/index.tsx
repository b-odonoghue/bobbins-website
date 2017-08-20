import * as React from "react";
import * as ReactDOM from "react-dom";
import { SiteRouter } from "./SiteRouter";
import 'jquery';

const element = document.getElementById('reactRoot');
if(element) {
    ReactDOM.render(<SiteRouter />, element);
}