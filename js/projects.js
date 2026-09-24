/* ==========================================================================
   projects.js —— 项目数据
   --------------------------------------------------------------------------
   这是日常唯一需要维护的文件。在数组末尾追加一条对象，页面会自动渲染，
   并同步更新"作品数量"与顶部的类别筛选标签。

   字段说明（内容来自 profile.md）：
     id         唯一标识，用于稳定编号
     title      项目名称
     category   所属类别（用于筛选，出现顺序决定标签顺序）
     tag        应用类型标签，显示在作品名称上方的编号行（与 category 是两个维度）
     period     展示用的完成时间
     date       <time datetime> 用，格式 YYYY-MM
     state      交付状态
     layout     版式变体：feature | split-left | split-right | editorial
     summary    项目简介，说明项目背景、本人职责与最终结果
     tech       技术栈数组
     image      配图路径
     imageSize  配图原始尺寸 [宽, 高]，用于避免加载时布局抖动
     link       外部链接，留空字符串则不渲染链接
   ========================================================================== */

/* 注意：必须用 var 声明。传统脚本里顶层 const 只存在于全局词法环境，
   不会挂到 window 上，main.js 读 window.PROJECTS 会拿到 undefined。 */
var PROJECTS = [
  {
    id: 'smart-cockpit-bench',
    title: '智能座舱实训系统',
    category: '智能座舱',
    tag: 'AI 应用',
    period: '2026.07',
    date: '2026-07',
    state: '已交付 · 投入院校教学使用',
    layout: 'feature',
    summary:
      '企业第二次委托开发的教学台架，作为技术负责人主导对第一代系统的完全重构，目标是提升教学适用性、硬件可靠性与现场可维护性。系统集成手势识别、疲劳监测、人脸识别、语音交互、声源定位与座椅/车窗实物控制六大模块：设计了「算法模块 / 硬件控制 / 学生代码沙箱」三层解耦架构，用统一的 AlgorithmModule 接口实现各感知模块启停同构化；通过 ManagedVisionModule 启动屏障与 worker 生命周期回收机制，解决 Jetson 现场反复启停导致的线程泄漏与崩溃问题。同时构建六道关卡的学生算法沙箱（AST 静态检查、导入白名单、危险调用禁用、pyflakes 分析、独立子进程预检、signature.bind 运行时契约校验），定义手势/疲劳/人脸/语音/声源定位五类算法接口契约，使教学与评测标准化。系统已投入某院校智能网联汽车专业教学使用，并形成完整的远程升级运维体系。',
    tech: ['Python', 'PySide6', 'Jetson Orin', 'OpenCV', 'Mediapipe', 'GCC-PHAT/SRP', 'M260C 六麦环阵', 'AST 代码沙箱'],
    image: 'assets/images/project-01.svg',
    imageSize: [1600, 720],
    link: ''
  },
  {
    id: 'adas-simulation',
    title: 'ADAS 高级驾驶辅助系统仿真实训平台',
    category: '自动驾驶',
    tag: '仿真应用',
    period: '2026.05',
    date: '2026-05',
    state: '已交付 · 按企业技术标准',
    layout: 'split-left',
    summary:
      '导师牵头的校企横向项目，基于 CARLA 0.9.13 仿真后端与 PyQt5 桌面界面，面向院校智能网联汽车专业，本人任技术负责人。设计并实现了 ACC、AEB、LKA、BSD 四大控制器并支持参数化 UI 实时调优；基于 YOLOPv2 完成可行驶区域与车道线双任务分割推理（FP16 加速），由掩膜加权二次拟合提取道路中心线并输出转向控制量与力反馈指令；设计了「AEB > LKA > ACC > 手动」优先级仲裁的 ControlMixer，实现多控制源并发下的安全仲裁与限幅保护。硬件侧接入罗技 G29 方向盘实现力反馈与手动变速箱逻辑，并基于串口接入 77GHz 毫米波雷达实物采集与 BEV 可视化。项目按企业技术标准交付，配套输出系统架构、环境部署、使用三份技术文档。',
    tech: ['Python', 'CARLA 0.9.13', 'PyQt5', 'YOLOPv2', 'FP16 推理', '罗技 G29', '77GHz 毫米波雷达', '串口通信'],
    image: 'assets/images/project-02.svg',
    imageSize: [1200, 900],
    link: ''
  },
  {
    id: 'industrial-agv',
    title: '工业级 AGV 底盘开发',
    category: '机器人系统',
    tag: 'ROS 应用',
    period: '2025.11',
    date: '2025-11',
    state: '阶段交付 · 企业横向项目',
    layout: 'split-right',
    summary:
      '20 万元企业横向项目，采用「导师负责底层控制、本人负责 ROS 上层开发」的分工模式，与导师协同开发两台面向工业仓储与车间物料转运场景的 AGV 底盘。基于计算平台搭建 ROS 开发环境，完成激光雷达 SLAM 建图与自主导航、多点路径配置与精准停靠、目标跟随等核心功能开发；对接底盘底层控制接口编写数据交互节点，实现 ROS 系统与底层的实时通信；并开展工业场景测试，持续优化建图精度、导航成功率与跟随稳定性。目前两台底盘核心功能已联调完成，按节点向企业交付阶段性成果并获企业认可。',
    tech: ['ROS', '激光雷达 SLAM', '自主导航', '多点路径规划', '目标跟随', '串口通信'],
    image: 'assets/images/project-03.svg',
    imageSize: [1200, 900],
    link: ''
  },
  {
    id: 'cockpit-system',
    title: '智能座舱系统开发',
    category: '智能座舱',
    tag: '桌面应用',
    period: '2025.07',
    date: '2025-07',
    state: '已量产 · 院校教学设备',
    layout: 'editorial',
    summary:
      '企业委托的智能座舱模拟台架项目（教学专用设备），兼顾「教学演示」与「实操实训」需求，最终按企业技术标准完成开发并实现量产。担任项目总技术负责人，主导系统模块化架构规划，设计模块间数据交互协议与接口规范，确保疲劳驾驶监测、危险驾驶监测、语音交互、手势控制等多模块高效协同；其中疲劳驾驶监测模块基于 dlib 提取眼睑开合度、眨眼频率、头部姿态角等特征，通过阈值判断与时序分析实时识别困倦与走神状态并触发声光预警；危险驾驶行为监测模块基于 YOLOv5 实现喝水、抽烟、手持电话等违规行为的实时检测，并完成数据集标注与模型训练优化。累计交付设备用于多所院校汽车智能网联、车辆工程专业教学。',
    tech: ['Python', 'dlib', 'YOLOv5', 'Mediapipe', '语音识别', 'PyQt'],
    image: 'assets/images/project-04.svg',
    imageSize: [1200, 900],
    link: ''
  },
  {
    id: 'line-following-car',
    title: '桌面级巡线 ROS 小车',
    category: '机器人系统',
    tag: '嵌入式应用',
    period: '2025.06',
    date: '2025-06',
    state: '已完成 · 校园开放日展出',
    layout: 'split-left',
    summary:
      '基于 ROS2 Humble 框架与 Jetson Orin Nano 嵌入式平台，采用纯视觉导航方案替代传统红外/激光传感器，实现桌面场景下的实时线路识别、自主路径跟踪与运动姿态控制。基于 OpenCV 开发图像处理流水线，完成图像去噪、颜色空间转换、轮廓检测与霍夫直线变换以提取巡线轨迹，并针对光照变化优化自适应阈值算法，避免阴影与反光导致的线路丢失；基于 ROS2 Humble 设计「视觉感知节点 + 运动控制节点」的模块化节点体系，通过 Topic 机制实现低延迟通信并使用 Launch 文件一键启动；同时设计 PID 闭环控制算法，根据线路偏移量动态调节左右电机转速。该小车在校园开放日期间获得《新快报》《广州日报》《信息时报》等多家主流媒体聚焦报道。',
    tech: ['Python', 'OpenCV', 'ROS2 Humble', 'Jetson Orin Nano', 'PID 闭环控制'],
    image: 'assets/images/project-05.svg',
    imageSize: [1200, 900],
    link: ''
  },
  {
    id: 'fencing-scoring',
    title: '击剑动作评分系统',
    category: '视觉算法',
    tag: '移动应用',
    period: '2025.03',
    date: '2025-03',
    state: '已上线 · 墨尔本大学击剑队使用',
    layout: 'editorial',
    summary:
      '基于计算机视觉技术实现对击剑动作的实时分析与评分，并提供赛前、赛后数据分析与战术优化建议。使用 Mediapipe 实现人体姿态识别并检测击剑动作关键点，通过归一化处理与像素坐标转换保证关键点数据的准确性和一致性；设计并实现了基于加权欧氏距离和余弦相似度的动作对比算法，为手肘、膝盖等不同关键点分配权重以计算用户动作与标准动作的相似度；并使用 Matplotlib 生成身体指标雷达图、攻击距离趋势图、姿态对比图等多种可视化报告，输出动作评分、关键点数据、生物力学指标与改进建议。小程序已成功上线，该击剑动作分析系统已在墨尔本大学青少年击剑队投入使用。',
    tech: ['Python', 'Mediapipe', 'OpenCV', 'NumPy', 'Matplotlib', '小程序'],
    image: 'assets/images/project-06.svg',
    imageSize: [1200, 900],
    link: ''
  }
];
