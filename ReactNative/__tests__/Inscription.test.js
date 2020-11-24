import React from "react"
import Enzyme,{shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Inscription from "../Components/Inscription";

import {Snackbar} from 'react-native-paper';

import axios from 'axios';

jest.mock('axios');

Enzyme.configure({ adapter: new Adapter() });

