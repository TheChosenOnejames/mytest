<!--
 * @Date: 2022-09-21 11:10:56
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-17 16:33:40
 * @Description: 
-->
<template>
  <div>
    <el-card class="card-box">
      <el-page-header @back="goBack" content="科目辅助余额表"> </el-page-header>

      <div class="container-a" v-if="a">
        <div class="top-box">
          <div class="account-box">
            <el-row class="seach" :gutter="20">
              <el-col :span="6">
                <div class="header-box" style="margin-top:15px">
                  <el-input v-model="input" placeholder="请输入内容">
                    <el-button
                      @click="searchcontent"
                      slot="append"
                      icon="el-icon-search"
                    ></el-button
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <div class="time-box">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
            <div class="button-box">
              <el-button type="primary" plain @click="dialogVisible = true"
                >手工导入</el-button
              >
              <el-button type="primary" plain @click="dialogVisibles = true"
                >变动检查</el-button
              >

              <el-dialog
                :modal-append-to-body="false"
                title="变动检查"
                :visible.sync="dialogVisibles"
                width="45%"
              >
                <div class="dialog-box">
                  <div class="box-1 box">
                    <h1>报表日期:</h1>
                    <span> {{ latest_date }}</span>
                  </div>
                  <div class="box-2 box">
                    <h1>对比表日期:</h1>
                    <el-select
                      ref="selectLabel"
                      clearable
                      @change="testSelect"
                      v-model="selectvalue"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in List"
                        :key="item.label"
                        :label="item.label"
                        :value="item.secondary_list"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="box-3 box">
                    <h1>报表数据:</h1>
                    <span> {{ latest_data_copy }}</span>
                  </div>
                  <div class="box-4 box">
                    <h1>对比表数据:</h1>
                    <el-select
                      ref="selectLabel2"
                      v-model="selectvalue2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in ok"
                        :key="item.label"
                        :label="item.label"
                        :value="item.label"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibles = false">取 消</el-button>
                  <el-button type="primary" @click="getuploading"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
              <el-dialog
                :modal-append-to-body="false"
                title="文件上传"
                :visible.sync="dialogVisible"
                width="45%"
              >
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="value2"
                  placeholder="选择日期"
                  type="date"
                >
                </el-date-picker>
                <el-upload
                  ref="upload"
                  drag
                  :limit="limitNum"
                  :auto-upload="false"
                  accept=".xls,.xlsx"
                  :action="UploadUrl()"
                  :before-upload="beforeUploadFile"
                  :on-change="fileChange"
                  :on-exceed="exceedFile"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :file-list="fileList"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                  </div>
                  <div class="el-upload__tip" slot="tip">
                    只能上传xlsx,xls文件，且不超过10M
                  </div>
                </el-upload>
                <br />
                <el-button size="small" type="primary" @click="uploadFile"
                  >立即上传</el-button
                >
                <el-button size="small" @click="dialogVisible = false"
                  >取消</el-button
                >
              </el-dialog>
            </div>
          </div>
        </div>
        <div class="table-box">
          <el-table
            v-loading="loadings"
            id="table"
            ref="dataTabless"
            height="700"
            border
            :header-cell-style="{
              'text-align': 'center',
              height: '10px',
              padding: '0px'
            }"
            :data="financialsupportList"
            style="width: 100%"
          >
            <el-table-column align="center" type="index" width="50" label="#">
            </el-table-column>

            <el-table-column
              v-if="columnHeaders[0].isShow"
              align="center"
              sortable
              prop="account_code"
              label="科目编码"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.account_code }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[1].isShow"
              align="center"
              sortable
              prop="account_name"
              label="科目全称"
              width="250px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.account_name }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[2].isShow"
              align="center"
              sortable
              prop="sub_code_one"
              label="辅助核算项一"
              width="250px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.sub_code_one }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[3].isShow"
              align="center"
              sortable
              prop="sub_code_two"
              label="辅助核算项二"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.sub_code_two }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[4].isShow"
              align="center"
              sortable
              prop="sub_code_three"
              label="辅助核算项三"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.sub_code_three }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[5].isShow"
              align="center"
              sortable
              prop="currency"
              label="币种"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.currency }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[6].isShow"
              align="right"
              sortable
              prop="opening_dr_balance"
              label="期初借方余额"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.opening_dr_balance }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[7].isShow"
              align="right"
              sortable
              prop="opening_cr_balance"
              label="期初贷方余额"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.opening_cr_balance }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[8].isShow"
              align="right"
              sortable
              prop="current_month_dr_amount"
              label="当期借方发生"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.current_month_dr_amount }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[9].isShow"
              align="right"
              sortable
              prop="current_month_cr_amount"
              label="当期贷方发生"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.current_month_cr_amount }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[10].isShow"
              align="right"
              sortable
              prop="accumulated_dr_amount"
              label="累计借方发生"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.accumulated_dr_amount }}
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column
              v-if="columnHeaders[11].isShow"
              sortable
              align="right"
              prop="accumulated_cr_amount"
              label="累计贷方发生"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.accumulated_cr_amount }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[12].isShow"
              sortable
              align="right"
              prop="closing_dr_balance"
              label="期末借方余额"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.closing_dr_balance }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[13].isShow"
              sortable
              align="right"
              prop="closing_cr_balance"
              label="期末贷方余额"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.closing_cr_balance }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[14].isShow"
              sortable
              align="center"
              prop="year"
              label="年"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.year }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[15].isShow"
              sortable
              align="center"
              prop="month"
              label="月"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.month }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[16].isShow"
              sortable
              align="center"
              prop="day"
              label="日"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.day }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[17].isShow"
              sortable
              align="center"
              prop="balance_date"
              label="报表日期"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.balance_date }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[18].isShow"
              sortable
              align="center"
              prop="number_date"
              label="数值型日期"
              width="150px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.number_date }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              v-if="columnHeaders[19].isShow"
              sortable
              align="center"
              prop="table_timestamp"
              label="数据时间戳"
              width="200px"
            >
              <el-table-column width="200" align="center" show-overflow-tooltip>
                <template slot="header" slot-scope="scope">
                  <el-popover placement="top" width="80" trigger="click">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >全选</el-checkbox
                    >
                    <el-checkbox-group
                      v-model="cities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        v-for="item in columnHeaders"
                        :label="item.title"
                        :key="item.title"
                      ></el-checkbox>
                    </el-checkbox-group>
                    <i class="el-icon-info" slot="reference"></i>
                  </el-popover>
                  <span v-show="false">{{ scope.row }}</span>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.table_timestamp }}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-box" style="margin-top:5px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="size"
            layout="total, sizes, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
        <div class="buttonprimary-box">
          <el-button size="mini" type="primary" @click="exportExcelsss"
            >导出表格</el-button
          >
        </div>
      </div>
      <div class="container-b" style="margin-top:20px" v-if="b">
        <div class="button-icon">
          <el-button
            type="primary"
            @click="backsheet"
            style="margin-bottom:10px;margin-right: 93%;"
            >前一页</el-button
          >
          <el-popover width="90" trigger="click">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll1"
              @change="handleCheckAllChange1"
              >全选</el-checkbox
            >
            <el-checkbox-group
              v-model="cities1"
              @change="handleCheckedCitiesChange1"
            >
              <el-checkbox
                v-for="item in columnHeaderss"
                :label="item.title"
                :key="item.title"
              ></el-checkbox>
            </el-checkbox-group>

            <i
              slot="reference"
              type="info"
              @click="dialogVisibles = true"
              class="el-icon-menu icon-box"
            ></i>
          </el-popover>
        </div>

        <el-table
          ref="dataTablesss"
          :show-overflow-tooltip="true"
          :header-cell-style="{
            'text-align': 'center',
            height: '20px',
            padding: '5px'
          }"
          element-loading-text="让子弹飞一会儿..."
          v-loading="loading"
          border
          height="700"
          :data="getcompareList"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            fixed
            type="index"
            width="50"
            label="id"
          >
          </el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            align="center"
            prop="account_code"
            label="科目编码"
            width="200"
            v-if="columnHeaderss[0].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.account_code }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            align="center"
            prop="sub_code_one"
            label="辅助核算项一"
            width="180"
            v-if="columnHeaderss[1].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.sub_code_one }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            align="center"
            prop="sub_code_two"
            label="辅助核算项二"
            width="250"
            v-if="columnHeaderss[2].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.sub_code_two }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            fixed
            show-overflow-tooltip
            align="center"
            prop="sub_code_three"
            label="辅助核算项三"
            width="200"
            v-if="columnHeaderss[3].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.sub_code_three }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="right"
            prop="post_opening_balance"
            label="调整后期出余额"
            width="200"
            v-if="columnHeaderss[4].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.post_opening_balance }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="right"
            prop="pre_opening_balance"
            label="调整前期初余额"
            width="200"
            v-if="columnHeaderss[5].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.pre_opening_balance }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="right"
            width="200"
            prop="post_current_amount"
            label="调整后当期发生"
            v-if="columnHeaderss[6].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.post_current_amount }}
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="right"
            width="200"
            prop="pre_current_amount"
            label="调整前当期发生"
            v-if="columnHeaderss[7].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.pre_current_amount }}
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="right"
            width="200"
            prop="post_accumulated_amount"
            label="调整后累计发生"
            v-if="columnHeaderss[8].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.post_accumulated_amount }}
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="right"
            width="200"
            prop="pre_accumulated_amount"
            label="调整前累计发生"
            v-if="columnHeaderss[9].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.pre_accumulated_amount }}
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="right"
            width="200"
            prop="opening_balance_dif"
            label="期初余额变动差异"
            v-if="columnHeaderss[10].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.opening_balance_dif }}
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="right"
            width="200"
            prop="current_amount_dif"
            label="当期发生变动差异"
            v-if="columnHeaderss[11].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.current_amount_dif }}
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            align="right"
            width="200"
            prop="accumulated_amount_dif"
            label="累计发生变动差异"
            v-if="columnHeaderss[12].isShow"
          >
            <el-table-column width="200" align="center" show-overflow-tooltip>
              <template slot="header" slot-scope="scope">
                <el-popover placement="top" width="80" trigger="click">
                  <el-checkbox
                    :indeterminate="isIndeterminate1"
                    v-model="checkAll1"
                    @change="handleCheckAllChange1"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="cities1"
                    @change="handleCheckedCitiesChange1"
                  >
                    <el-checkbox
                      v-for="item in columnHeaderss"
                      :label="item.title"
                      :key="item.title"
                    ></el-checkbox>
                  </el-checkbox-group>
                  <i class="el-icon-info" slot="reference"></i>
                </el-popover>
                <span v-show="false">{{ scope.row }}</span>
              </template>
              <template slot-scope="scope">
                {{ scope.row.accumulated_amount_dif }}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  reqdialogupload,
  reqfinancialsupport,
  reqimportdata,
  reqdialogList
} from "@/api/gts.js";

const columnSelecteds = [
  "科目编码",
  "科目全称",
  "辅助核算一",
  "辅助核算二",
  "辅助核算三",
  "币种",
  "期初借方余额",
  "期初贷方余额",
  "当期借方发生",
  "当期贷方发生",
  "累计借方发生",
  "累计贷方发生",
  "期末借方余额",
  "期末贷方余额",
  "年",
  "月",
  "日",
  "报表日期",
  "数值型日期",
  "数据时间戳"
];
const columnSelectedss = [
  "科目编码",
  "辅助核算项一",
  "辅助核算项二",
  "辅助核算项三",
  "调整后期出余额",
  "调整前期出余额",
  "调整后当期发生",
  "调整前当期发生",
  "调整后累计发生",
  "调整前累计发生",
  "期初余额变动差异",
  "当期余额变动差异",
  "累计发生变动差异"
];
export default {
  data() {
    return {
      loading: true,
      loadings: false,
      a: true,
      b: false,
      total: 1,
      size: 100,
      currentPage2: 1,
      ok: "",
      qw: [],
      ww: 0,
      selectvalue: "",
      selectvalue2: "",
      pp: [],
      ee: [],
      aa: [],
      date: [],
      value: "",
      /*   ee: [],
      aa: "", */
      List: [],
      latest_data_copy: "",
      latest_date: "",
      dialogVisibles: false,
      fileList: [],
      limitNum: 20,
      checkAll: false,
      isIndeterminate: true,
      dialogVisible: false,
      checkAll1: false,
      isIndeterminate1: true,
      financialsupportList: [],
      input: "",
      value1: "",
      value2: "",
      cities: columnSelecteds,
      cities1: columnSelectedss,
      columnHeaders: [
        { index: 0, title: "科目编码", isShow: true },
        { index: 1, title: "科目全称", isShow: true },
        { index: 2, title: "辅助核算一", isShow: true },
        { index: 3, title: "辅助核算二", isShow: true },
        { index: 4, title: "辅助核算三", isShow: true },
        { index: 5, title: "币种", isShow: true },
        { index: 6, title: "期初借方余额", isShow: true },
        { index: 7, title: "期初贷方余额", isShow: true },
        { index: 8, title: "当期借方发生", isShow: true },
        { index: 9, title: "当期贷方发生", isShow: true },
        { index: 10, title: "累计借方发生", isShow: true },
        { index: 11, title: "累计贷方发生", isShow: true },
        { index: 12, title: "期末借方余额", isShow: true },
        { index: 13, title: "期末贷方余额", isShow: true },
        { index: 14, title: "年", isShow: true },
        { index: 15, title: "月", isShow: true },
        { index: 16, title: "日", isShow: true },
        { index: 17, title: "报表日期", isShow: true },
        { index: 18, title: "数值型日期", isShow: true },
        { index: 19, title: "数据时间戳", isShow: true }
      ],
      columnHeaderss: [
        { index: 0, title: "科目编码", isShow: true },
        { index: 1, title: "辅助核算项一", isShow: true },
        { index: 2, title: "辅助核算项二", isShow: true },
        { index: 3, title: "辅助核算项三", isShow: true },
        { index: 4, title: "调整后期出余额", isShow: true },
        { index: 5, title: "调整前期出余额", isShow: true },
        { index: 6, title: "调整后当期发生", isShow: true },
        { index: 7, title: "调整前当期发生", isShow: true },
        { index: 8, title: "调整后累计发生", isShow: true },
        { index: 9, title: "调整前累计发生", isShow: true },
        { index: 10, title: "期初余额变动差异", isShow: true },
        { index: 11, title: "当期余额变动差异", isShow: true },
        { index: 12, title: "累计发生变动差异", isShow: true }
      ],
      getcompareList: []
    };
  },
  methods: {
    exportExcelsss() {
      let fix = document.querySelector(".el-table__fixed");
      let wb;
      if (fix) {
        //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
        wb = XLSX.utils.table_to_book(
          document.querySelector("#table").removeChild(fix)
        );
        document.querySelector("#table").appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#table"));
      }
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "科目辅助余额表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    backsheet() {
      this.a = true;
      this.b = false;
    },
    async getuploading() {
      this.a = false;
      this.b = true;
      const { data: res } = await reqdialogupload(
        this.latest_date,
        this.$refs.selectLabel.selected.label,
        this.latest_data_copy,
        this.$refs.selectLabel2.selected.label
      );
      this.getcompareList = res.compare_result;
      console.log(res, "jjjjjj");
      this.dialogVisibles = false;
      this.loading = false;
    },
    handleSizeChange(newSize) {
      this.size = newSize;
      this.getList();
    },
    handleCurrentChange(newpage) {
      this.currentPage2 = newpage;
      this.getList();
    },
    searchcontent() {
      this.getList();
    },
    testSelect() {
      console.log(this.selectvalue);
      let ok = this.selectvalue;
      this.selectvalue - 1;
      this.ok = ok.flat();
      console.log(this.selectvalue, "yyyyy");
      console.log(this.List.secondary_list);
      console.log(this.List, "mmmmmmmm");
      let ee = this.List.map(x => {
        return x.secondary_list;
      });
      this.ee = ee.flat();
      console.log(ee, "qqqqq");
      console.log();
    },
    goBack() {
      this.$router.push("/backlog");
    },
    async getdialogList() {
      const { data: res } = await reqdialogList();
      console.log(res, "tttttttt");
      /* 右侧表 */
      this.List = res.compare_list;
      console.log(this.ww, "hhhjjj");
      if (this.ww == 0) {
        this.qw = res.compare_list[0].secondary_list;
      } else {
        var i = this.selectvalue;
        this.qw = res.compare_list[i].secondary_list;
      }
      console.log(this.qw, "uuu");
      console.log(this.List, "999999");
      this.latest_date = res.latest_date;
      this.latest_data_copy = res.latest_data_copy;
      /*   console.log(this.latest_date, "hhhhhhh"); */
      let jj = this.List;
    },

    async getList() {
      const [beginPubdate, endPubdate] = this.date || [];
      const { data: res } = await reqfinancialsupport(
        this.currentPage2,
        this.size,
        beginPubdate,
        endPubdate
      );
      this.total = res.count;
      this.financialsupportList = res.results;

      /*       this.financialsupport = res.data.result; */
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length +
          fileList.length} 个`
      );
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw);
      this.fileList.push(file.raw);
      console.log(this.fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx" || "xls") {
        this.$message.warning("只能上传后缀是.xlsx和.xls的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
    },
    UploadUrl: function() {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return "";
    },
    async uploadFile() {
      this.loadings = true;
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        let form = new FormData();
        form.append("file", this.fileList[0]);
        form.append("file", this.fileList[1]);
        form.append("file", this.fileList[2]);
        form.append("file", this.fileList[3]);
        form.append("file", this.fileList[4]);
        form.append("file", this.fileList[5]);
        form.append("file", this.fileList[6]);
        form.append("file", this.fileList[7]);
        form.append("file", this.fileList[8]);
        form.append("file", this.fileList[9]);
        form.append("file", this.fileList[10]);
        form.append("file", this.fileList[11]);
        form.append("file", this.fileList[12]);
        form.append("file", this.fileList[13]);
        form.append("file", this.fileList[14]);
        form.append("file", this.fileList[15]);
        form.append("file", this.fileList[16]);
        form.append("file", this.fileList[17]);
        form.append("file", this.fileList[18]);
        form.append("file", this.fileList[19]);
        form.append("file", this.fileList[20]);
        form.append("date", this.value2);
        const res = await reqimportdata(form);
        if (res.status == 200) {
          this.$message.success("上传成功");
          this.loadings = false;
          this.fileList = [];
          this.$refs.upload.clearFiles();
          this.dialogVisible = false;
        }
      }
    },
    handleCheckAllChange(val) {
      //console.log(val)
      this.cities = val ? columnSelecteds : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },

    handleCheckAllChange1(val) {
      //console.log(val)
      this.cities1 = val ? columnSelectedss : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.cities1.length;
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.cities1.length;
    }
  },
  watch: {
    /**
     * @title 监听列显示隐藏
     */
    cities(newArrayVal) {
      // 计算为被选中的列标题数组
      var nonSelecteds = this.columnHeaders
        .filter(item => newArrayVal.indexOf(item.title) == -1)
        .map(item => item.title);
      // 根据计算结果进行表格重绘
      this.columnHeaders.filter(item => {
        let isNonSelected = nonSelecteds.indexOf(item.title) != -1;
        if (isNonSelected) {
          // 隐藏未选中的列
          item.isShow = false;
          this.$nextTick(() => {
            this.$refs.dataTabless.doLayout();
          });
        } else {
          // 显示已选中的列
          item.isShow = true;
          this.$nextTick(() => {
            this.$refs.dataTabless.doLayout();
          });
        }
      });
    },
    /**
     * @title 监听列显示隐藏
     */
    cities1(newArrayVal) {
      // 计算为被选中的列标题数组
      var nonSelecteds = this.columnHeaderss
        .filter(item => newArrayVal.indexOf(item.title) == -1)
        .map(item => item.title);
      // 根据计算结果进行表格重绘
      this.columnHeaderss.filter(item => {
        let isNonSelected = nonSelecteds.indexOf(item.title) != -1;
        if (isNonSelected) {
          // 隐藏未选中的列
          item.isShow = false;
          this.$nextTick(() => {
            this.$refs.dataTablesss.doLayout();
          });
        } else {
          // 显示已选中的列
          item.isShow = true;
          this.$nextTick(() => {
            this.$refs.dataTablesss.doLayout();
          });
        }
      });
    }
  },

  created() {
    this.getList();

    this.getdialogList();
  }
};
</script>

<style scoped lang="less">
.card-box {
  width: 100%;
  position: relative;
  .top-box {
    margin-bottom: 20px;
    .account-box {
      position: relative;
      .time-box {
        position: absolute;
        top: 15px;
        left: 40%;
      }

      .dialog-box {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        height: 200px;
        width: 100%;
      }
      .box {
        width: 45%;
        height: 45%;
      }
      .button-box {
        position: absolute;
        top: 15px;
        right: 10%;
      }
    }
  }
  .buttonprimary-box {
    position: absolute;
    right: 18px;
    bottom: 20px;
  }
}
</style>
