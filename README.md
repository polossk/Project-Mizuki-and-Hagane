# Project Mizuki and Hagane

![nodejs](https://img.shields.io/badge/nodejs-v6.9.4-026e00.svg)
![mongodb](https://img.shields.io/badge/mongodb-v3.4.2-7fc857.svg)
![nginx](https://img.shields.io/badge/nginx-1.7.4-00B140.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Home

Concise website project for **C**onference **S**ite of the 11th National Annual Meeting of **C**omputational **M**athematics, alias CSCM 2017. Basicly, this website was build by nodejs, mongodb and nginx. Some python scripts of database operation were provided.

## Content

* Project Hagane, static website for news release
* Project Mizuki, concise dynamic website for uesr registration
* Folder pyscript, python scripts of database operation
* Folder nginx-config, the nginx config files of this project, using fake hostname(be awared of that)
* 7zip file `public.7z`, the static resources of the websites, unzip it to the `public` folder in Mizuki and the `root` folder of Hagane.

## Note

Specificly, Project Mizuki was build by nodejs that preparing for user registration and report submission, while Project Hagane was static that preparing for conference announcement.

The website of [CSCM2017](http://www.cscm2017.com/) will soon be closed, because of the end of the conference. One who are interested can check my blog [nodejs-mongodb-mission](http://blog.polossk.com/2017/03/nodejs-mongodb-mission/) for further information.

The Project Hagane was completely a static website, building by my python script `glue`, which connecting the header, title, content, footer together. However, `glue` was too ugly to modify and everyone was able to write a better one. So I decided not publish this script.

## Third Party Components
* [Metronic - Responsive Admin Dashboard Template](http://keenthemes.com/), [github](https://github.com/mikesmayer/metronic), [purchase](https://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469)

## Special Thanks

[skyz](https://github.com/Sssssskky), [lrtfm](https://github.com/lrtfm), and members of Office 226.

## Copyright
Use this code whatever you want, under the circumstances of acknowleged the mit license this page below. Star this repository if you like, and it will be very generous of you!

## License
The MIT License (MIT)
Copyright (c) 2017 Shangkun Shen, http://polossk.com <polossk_dev@126.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.