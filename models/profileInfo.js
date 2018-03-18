'use strict';

class ProfileInfo {
    constructor({ gid, name, phone, avatar }) {
        this.gid = gid; // Git ID
        this.name = name;
        this.phone = phone;
        this.avatar = avatar;
    }
}

exports = ProfileInfo;
