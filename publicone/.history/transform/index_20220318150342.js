import { stream } from 'unified-stream'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeParse from 'rehype-parse'
import remarkStringify from 'remark-stringify'
import { visit } from 'unist-util-visit'
import find from 'unist-util-find'
import { readSync, writeSync } from 'to-vfile'
import { reporter } from 'vfile-reporter'
import rehypeStringify from 'rehype-stringify'
import { h, s } from 'hastscript'
import template from 'art-template'
import getData from './transform_common.js'
import path from "path"
import fs from 'fs'
import { exec } from 'child_process';
const __dirname = path.resolve();
//初始化数据
var Data = getData();
const elementData = Data.elementData //{}元素独立数据
const cyclicData = Data.cyclicData //[]需要循环的数据
let fileName = 'index'

//配置模板引擎
template.defaults.root = '../art';
template.defaults.extname = '.art';
const html = template('index', { elementData, cyclicData }); //结合模板
//转换页面内容
fs.writeFile('../index.html', html, () => {
    console.log('--------------* index.html *-------------ok!');
})