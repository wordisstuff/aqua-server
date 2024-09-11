import { serverDeployLink } from '../constants/constants.js';

const helloMark = link => {
    if (!link) {
        return `<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            Hello! It is Aqua Tracker server! Click <a href="${serverDeployLink}/api-docs/"> Api Docs </a>
        </div>`;
    }
};

export default helloMark;
