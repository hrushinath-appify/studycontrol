export interface MysteryTopic {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  estimatedTime: number // minutes
  tags: string[]
  questions: string[]
  funFacts: string[]
  relatedTopics: string[]
}

export const mysteryTopics: MysteryTopic[] = [
  {
    "id": "anaesthesia-history-ethics",
    "title": "History and Ethical Aspects of Anaesthesia",
    "description": "Discover the fascinating journey of anaesthesia from its early beginnings to modern practice. Explore the ethical challenges and considerations that have shaped its development.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["PREOPERATIVE EVALUATION AND MONITORING"],
    "questions": [
      "How has the discovery of anaesthesia changed surgical procedures?",
      "What are the key ethical dilemmas faced in anaesthesia practice?",
      "How have historical events influenced current anaesthesia guidelines?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Evolution of Anaesthetic Agents",
      "Informed Consent in Anaesthesia",
      "Patient Safety",
      "Medical Ethics",
      "Pioneers of Anaesthesia"
    ]
  },
  {
    "id": "anaesthesia-preop-evaluation",
    "title": "Preoperative Evaluation",
    "description": "Learn why thorough preoperative evaluation is critical for patient safety and successful outcomes. Understand the steps and assessments involved before administering anaesthesia.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["PREOPERATIVE EVALUATION AND MONITORING"],
    "questions": [
      "What are the essential components of a preoperative evaluation?",
      "How does preoperative assessment minimize anaesthetic risks?",
      "Which patient factors must be considered during preoperative screening?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "ASA Physical Status Classification",
      "Preoperative Investigations",
      "Risk Stratification",
      "Patient History and Examination"
    ]
  },
  {
    "id": "anaesthesia-cns-cvs-monitoring",
    "title": "CNS and CVS Monitoring in Anaesthesia",
    "description": "Gain insight into the methods and importance of monitoring the central nervous system and cardiovascular system during anaesthesia. Explore the technologies that enhance patient safety.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["PREOPERATIVE EVALUATION AND MONITORING"],
    "questions": [
      "Which parameters are monitored for CNS and CVS during anaesthesia?",
      "What are the benefits of advanced cardiovascular monitoring techniques?",
      "How can CNS monitoring improve anaesthetic management?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Electroencephalography (EEG)",
      "Invasive Blood Pressure Monitoring",
      "ECG Monitoring",
      "Haemodynamic Monitoring",
      "Neuromuscular Monitoring"
    ]
  },
  {
    "id": "anaesthesia-respiratory-monitoring",
    "title": "Respiratory Monitoring in Anaesthesia",
    "description": "Explore the vital role of respiratory monitoring in ensuring patient safety during anaesthesia. Learn about various devices and indicators used to assess respiratory function.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["PREOPERATIVE EVALUATION AND MONITORING"],
    "questions": [
      "What are the key respiratory parameters monitored under anaesthesia?",
      "How does capnography aid in respiratory monitoring?",
      "Why is pulse oximetry crucial during anaesthesia?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Capnography",
      "Pulse Oximetry",
      "Ventilatory Parameters",
      "Airway Management",
      "Blood Gas Analysis"
    ]
  },
  {
    "id": "airway-devices",
    "title": "Airway Devices",
    "description": "Airway devices are essential tools in anaesthesia for ensuring a patent airway and effective ventilation. Understanding their types and applications is crucial for safe airway management.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AIRWAY MANAGEMENT AND RESUSCITATION"],
    "questions": [
      "What are the different types of airway devices used in anaesthesia?",
      "When would you choose a supraglottic airway over an endotracheal tube?",
      "What are the complications associated with airway device insertion?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Supraglottic Airway Devices",
      "Endotracheal Tubes",
      "Laryngeal Mask Airway",
      "Airway Adjuncts",
      "Airway Assessment"
    ]
  },
  {
    "id": "intubation",
    "title": "Intubation",
    "description": "Intubation is a critical procedure for securing the airway during surgery or emergencies. Proper technique and knowledge are essential to minimize complications and ensure patient safety.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AIRWAY MANAGEMENT AND RESUSCITATION"],
    "questions": [
      "What are the steps involved in performing tracheal intubation?",
      "How do you identify and manage a difficult airway during intubation?",
      "What are the indications and contraindications for intubation?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Direct Laryngoscopy",
      "Video Laryngoscopy",
      "Rapid Sequence Intubation",
      "Difficult Airway Algorithm",
      "Extubation"
    ]
  },
  {
    "id": "breathing-systems",
    "title": "Breathing Systems",
    "description": "Breathing systems connect patients to anaesthesia machines, delivering gases and removing waste. They play a pivotal role in maintaining adequate ventilation and patient safety.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AIRWAY MANAGEMENT AND RESUSCITATION"],
    "questions": [
      "What are the different types of breathing systems used in anaesthesia?",
      "How do you choose the appropriate breathing system for a patient?",
      "What are the advantages and disadvantages of open versus closed breathing systems?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Circle System",
      "Mapleson Systems",
      "Non-Rebreathing Circuits",
      "Ventilator Connections",
      "CO2 Absorption"
    ]
  },
  {
    "id": "anesthesia-workstation",
    "title": "Anesthesia Workstation",
    "description": "The anesthesia workstation integrates various devices to deliver, monitor, and manage anaesthesia. Mastery of its components ensures safe and efficient perioperative care.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AIRWAY MANAGEMENT AND RESUSCITATION"],
    "questions": [
      "What are the essential components of an anesthesia workstation?",
      "How do modern anesthesia workstations enhance patient safety?",
      "What routine checks should be performed on the anesthesia workstation before use?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Gas Delivery Systems",
      "Vaporizers",
      "Monitoring Equipment",
      "Scavenging Systems",
      "Workstation Safety Checks"
    ]
  },
  {
    "id": "bls-and-pals",
    "title": "BLS and PALS",
    "description": "Basic Life Support (BLS) and Pediatric Advanced Life Support (PALS) are protocols for emergency resuscitation. They are vital skills for managing cardiac and respiratory arrest in both adults and children.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AIRWAY MANAGEMENT AND RESUSCITATION"],
    "questions": [
      "What are the key steps in performing BLS for adults versus children?",
      "How do you recognize and respond to pediatric cardiac arrest?",
      "What medications are commonly used during PALS protocols?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "CPR Techniques",
      "Automated External Defibrillator (AED)",
      "Airway Management in Pediatrics",
      "Rescue Breathing",
      "PALS Algorithms"
    ]
  },
  {
    "id": "acls",
    "title": "ACLS",
    "description": "Advanced Cardiovascular Life Support (ACLS) is a set of clinical guidelines for urgent treatment of cardiac arrest and life-threatening emergencies. ACLS emphasizes rapid assessment, intervention, and teamwork.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AIRWAY MANAGEMENT AND RESUSCITATION"],
    "questions": [
      "What are the core algorithms used in ACLS for cardiac arrest?",
      "How does early defibrillation impact outcomes in cardiac emergencies?",
      "What are the indications for using advanced airway management in ACLS?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cardiac Arrest Algorithms",
      "Airway and Ventilation in ACLS",
      "Post-Resuscitation Care",
      "Pharmacology in ACLS",
      "Team Dynamics"
    ]
  },
  {
    "id": "ventilation-o2-delivery-systems",
    "title": "Ventilation and O2 Delivery Systems",
    "description": "Ventilation and oxygen delivery systems are crucial for maintaining adequate gas exchange during anaesthesia. Their selection and management are key to patient safety and effective care.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AIRWAY MANAGEMENT AND RESUSCITATION"],
    "questions": [
      "What are the different types of ventilation and oxygen delivery systems?",
      "How do you determine the appropriate mode of ventilation for a patient?",
      "What complications can arise from improper oxygen delivery?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Mechanical Ventilation",
      "Non-Invasive Ventilation",
      "High-Flow Nasal Cannula",
      "Oxygen Masks and Devices",
      "Ventilator Settings"
    ]
  },
  {
    "id": "depolarising-muscle-relaxants",
    "title": "Depolarising Muscle Relaxants",
    "description": "Depolarising muscle relaxants are agents that mimic acetylcholine at the neuromuscular junction, causing continuous stimulation and subsequent muscle paralysis. They are commonly used to facilitate intubation and provide muscle relaxation during surgery.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["MUSCLE RELAXANTS"],
    "questions": [
      "How do depolarising muscle relaxants differ from non-depolarising agents in their mechanism of action?",
      "What are the clinical indications and contraindications for using depolarising muscle relaxants?",
      "What are the potential side effects and complications associated with depolarising muscle relaxants?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Succinylcholine",
      "Phases of Block",
      "Adverse Reactions",
      "Reversal of Neuromuscular Blockade",
      "Monitoring Neuromuscular Function"
    ]
  },
  {
    "id": "non-depolarising-muscle-relaxants",
    "title": "Non-Depolarising Muscle Relaxants",
    "description": "Non-depolarising muscle relaxants work by competitively blocking acetylcholine receptors, preventing muscle contraction. These agents are widely used in anaesthesia to provide controlled muscle relaxation with reversible effects.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["MUSCLE RELAXANTS"],
    "questions": [
      "What is the mechanism of action of non-depolarising muscle relaxants?",
      "How is the reversal of non-depolarising muscle relaxants achieved?",
      "What factors influence the duration of action of non-depolarising muscle relaxants?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Aminosteroid Muscle Relaxants",
      "Benzylisoquinolinium Compounds",
      "Reversal Agents",
      "Drug Interactions",
      "Residual Paralysis"
    ]
  },
  {
    "id": "inhaled-anaesthetics-properties-n2o-halothane",
    "title": "Inhaled Anaesthetics - Properties, N2O and Halothane",
    "description": "Explore the properties of inhaled anaesthetics, focusing on nitrous oxide (N2O) and halothane. Understand their mechanisms, clinical uses, and unique characteristics in general anaesthesia.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL ANAESTHESIA"],
    "questions": [
      "What are the pharmacological properties of nitrous oxide and halothane?",
      "How do N2O and halothane differ in terms of onset, potency, and safety?",
      "What are the clinical indications and contraindications for using halothane?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Minimum Alveolar Concentration (MAC)",
      "Blood-Gas Partition Coefficient",
      "Side Effects of Halothane",
      "Nitrous Oxide Analgesia",
      "Inhalational Induction"
    ]
  },
  {
    "id": "inhaled-anaesthetics-fluorinated-inert-therapeutic",
    "title": "Inhaled Anaesthetics - Fluorinated Agents, Inert Agents and Therapeutic Gases",
    "description": "Dive into the world of fluorinated inhaled anaesthetics, inert agents, and therapeutic gases. Learn their roles in modern anaesthesia and the advantages they offer over older agents.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL ANAESTHESIA"],
    "questions": [
      "What are the key features of fluorinated inhaled anaesthetic agents?",
      "How do inert gases differ from therapeutic gases in anaesthetic practice?",
      "What are the safety considerations when using modern inhaled anaesthetics?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Sevoflurane",
      "Desflurane",
      "Xenon Anaesthesia",
      "Oxygen Therapy",
      "Environmental Impact of Anaesthetic Gases"
    ]
  },
  {
    "id": "intravenous-anesthesia-barbiturates-benzodiazepines-propofol",
    "title": "Intravenous Anesthesia - Barbiturates, Benzodiazepines & Propofol",
    "description": "Understand the use of barbiturates, benzodiazepines, and propofol in intravenous anaesthesia. Compare their mechanisms, advantages, and considerations in perioperative care.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL ANAESTHESIA"],
    "questions": [
      "How do barbiturates and benzodiazepines act as intravenous anaesthetic agents?",
      "What makes propofol a preferred agent for induction of anaesthesia?",
      "What are the risks and precautions associated with intravenous anaesthetics?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Thiopental",
      "Midazolam",
      "Propofol Infusion Syndrome",
      "Sedation vs. Anaesthesia",
      "Recovery Characteristics"
    ]
  },
  {
    "id": "intravenous-anesthesia-etomidate-ketamine-daycare",
    "title": "Intravenous Anesthesia - Etomidate, Ketamine and Daycare Surgery",
    "description": "Explore the unique properties of etomidate and ketamine in intravenous anaesthesia, especially for daycare surgeries. Learn how their profiles suit specific patient populations and surgical needs.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL ANAESTHESIA"],
    "questions": [
      "What are the advantages of etomidate and ketamine in intravenous anaesthesia?",
      "How is ketamine different from other intravenous anaesthetics in terms of effects and safety?",
      "Why are certain agents preferred for daycare or ambulatory surgery?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Dissociative Anaesthesia",
      "Haemodynamic Stability",
      "Emergence Phenomena",
      "Rapid Recovery Techniques",
      "Outpatient Anaesthesia Protocols"
    ]
  },
  {
    "id": "local-anaesthetics-general-properties",
    "title": "Local Anaesthetics - General Properties",
    "description": "Local anaesthetics block nerve conduction in targeted areas, providing pain relief without loss of consciousness. Understanding their general properties is essential for safe and effective clinical use.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOCAL AND REGIONAL ANAESTHESIA"],
    "questions": [
      "What is the mechanism of action of local anaesthetics?",
      "How do the physicochemical properties of local anaesthetics affect their potency and duration?",
      "What factors influence the onset and efficacy of local anaesthetic agents?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Classification of Local Anaesthetics",
      "Pharmacokinetics",
      "Pharmacodynamics",
      "Toxicity",
      "Allergic Reactions"
    ]
  },
  {
    "id": "local-anaesthetics-specific-drugs",
    "title": "Local Anesthetics - Specific Drugs",
    "description": "Various local anaesthetic drugs have unique properties, indications, and safety profiles. Selection of the appropriate agent depends on clinical scenario and patient factors.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOCAL AND REGIONAL ANAESTHESIA"],
    "questions": [
      "What are the differences between commonly used local anaesthetic drugs?",
      "Which local anaesthetics are preferred for specific procedures?",
      "How do metabolism and toxicity vary among different local anaesthetic agents?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Lidocaine",
      "Bupivacaine",
      "Ropivacaine",
      "Prilocaine",
      "Chloroprocaine"
    ]
  },
  {
    "id": "regional-anaesthesia-techniques",
    "title": "Regional Anesthesia: Techniques",
    "description": "Regional anaesthesia involves numbing large areas of the body by targeting specific nerve groups. Mastery of various techniques is crucial for pain management during and after surgery.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOCAL AND REGIONAL ANAESTHESIA"],
    "questions": [
      "What are the main types of regional anaesthesia techniques?",
      "How is ultrasound guidance used in regional anaesthesia?",
      "What are the steps involved in performing a spinal or epidural block?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Spinal Anaesthesia",
      "Epidural Anaesthesia",
      "Ultrasound-Guided Blocks",
      "Anatomical Landmarks",
      "Continuous Catheters"
    ]
  },
  {
    "id": "regional-anaesthesia-complications-contraindications",
    "title": "Regional Anesthesia: Complications and Contraindications",
    "description": "Regional anaesthesia carries potential risks and may not be suitable for all patients. Awareness of complications and contraindications is vital for safe practice.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOCAL AND REGIONAL ANAESTHESIA"],
    "questions": [
      "What are the common complications associated with regional anaesthesia?",
      "How can you identify and manage contraindications to regional anaesthesia?",
      "What strategies help minimize the risk of adverse events during regional techniques?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Nerve Injury",
      "Infection Risk",
      "Bleeding and Hematoma",
      "Local Anaesthetic Systemic Toxicity (LAST)",
      "Patient Selection"
    ]
  },
  {
    "id": "peripheral-nerve-blocks",
    "title": "Peripheral Nerve Blocks",
    "description": "Peripheral nerve blocks provide targeted pain relief by anesthetizing specific nerves or plexuses. These techniques are essential for surgical anesthesia and postoperative analgesia.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOCAL AND REGIONAL ANAESTHESIA"],
    "questions": [
      "Which nerves are commonly targeted in peripheral nerve blocks?",
      "How does ultrasound guidance improve the safety and accuracy of nerve blocks?",
      "What are the potential complications of peripheral nerve blocks?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Brachial Plexus Block",
      "Femoral Nerve Block",
      "Sciatic Nerve Block",
      "Ultrasound Guidance",
      "Complication Management"
    ]
  },
  {
    "id": "anaesthetic-implication-concurrent-diseases",
    "title": "Anaesthetic Implication of Concurrent Diseases",
    "description": "Anaesthesia management must be tailored for patients with coexisting diseases to minimize risks and complications. Understanding these implications ensures safe perioperative care and optimal outcomes.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ANAESTHESIA IN SPECIFIC CONDITIONS"],
    "questions": [
      "How do cardiovascular diseases affect anaesthetic planning and drug selection?",
      "What precautions should be taken when anaesthetizing patients with renal or hepatic impairment?",
      "How does diabetes mellitus influence perioperative anaesthetic management?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Anaesthesia in Cardiac Disease",
      "Anaesthesia for Renal Dysfunction",
      "Hepatic Disease Considerations",
      "Endocrine Disorders and Anaesthesia",
      "Preoperative Optimization"
    ]
  },
  {
    "id": "pediatric-obstetric-anaesthesia",
    "title": "Pediatric and Obstetric Anaesthesia",
    "description": "Pediatric and obstetric anaesthesia require specialized approaches due to unique physiological and pharmacological considerations. Safe practice demands tailored techniques for these patient groups.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ANAESTHESIA IN SPECIFIC CONDITIONS"],
    "questions": [
      "What are the key differences between pediatric and adult anaesthesia?",
      "Which anaesthetic techniques are preferred for cesarean section and labor analgesia?",
      "How do you assess and manage airway challenges in pediatric patients?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Physiological Differences in Children",
      "Regional Anaesthesia in Obstetrics",
      "Airway Management in Pediatrics",
      "Fetal Monitoring",
      "Drug Dosing Adjustments"
    ]
  },
  {
    "id": "complications-of-anaesthesia",
    "title": "Complications of Anaesthesia",
    "description": "Anaesthesia, while generally safe, can lead to various complications ranging from mild to life-threatening. Understanding these complications is crucial for prompt recognition, prevention, and effective management.",
    "category": "Anaesthesia",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["A COMPLICATIONS OF ANAESTHESIA"],
    "questions": [
      "What are the most common complications associated with general and regional anaesthesia?",
      "How can anaesthetic complications be prevented and managed intraoperatively?",
      "Which patient factors increase the risk of anaesthetic complications?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Airway Complications",
      "Cardiovascular Events",
      "Allergic Reactions",
      "Postoperative Nausea and Vomiting",
      "Malignant Hyperthermia"
    ]
  },
  {
    "id": "gametogenesis",
    "title": "Gametogenesis",
    "description": "Gametogenesis is the process by which sperm and egg cells are formed through meiosis. This fundamental event ensures genetic diversity and is essential for human reproduction.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "What are the main stages of gametogenesis in humans?",
      "How does meiosis contribute to genetic variation during gametogenesis?",
      "What are the differences between spermatogenesis and oogenesis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Meiosis",
      "Spermatogenesis",
      "Oogenesis",
      "Genetic Recombination",
      "Fertilization"
    ]
  },
  {
    "id": "pre-embryonic-phase",
    "title": "Pre-Embryonic Phase of Development",
    "description": "The pre-embryonic phase covers the first two weeks after fertilization, including cleavage, blastocyst formation, and implantation. It sets the foundation for embryonic development.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "What key events occur during the pre-embryonic phase of development?",
      "How is the blastocyst formed and what is its significance?",
      "What are the steps involved in implantation?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Fertilization",
      "Cleavage",
      "Blastocyst",
      "Implantation",
      "Early Cell Differentiation"
    ]
  },
  {
    "id": "embryonic-phase",
    "title": "Embryonic Phase of Development",
    "description": "The embryonic phase spans from the third to the eighth week of development, marked by organogenesis and rapid differentiation. This period is critical for forming all major organ systems.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "What are the main stages of organogenesis during the embryonic phase?",
      "Why is the embryonic phase highly sensitive to teratogens?",
      "How do germ layers contribute to organ development?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Germ Layers",
      "Organogenesis",
      "Neurulation",
      "Somitogenesis",
      "Embryonic Folding"
    ]
  },
  {
    "id": "placenta-fetal-membranes-twinning",
    "title": "Placenta, Fetal Membranes and Twinning",
    "description": "The placenta and fetal membranes support fetal growth and protect the developing embryo. Twinning involves unique developmental processes leading to identical or fraternal twins.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "What are the functions of the placenta and fetal membranes?",
      "How do monozygotic and dizygotic twinning differ?",
      "What are the clinical implications of abnormal placental development?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Placental Structure",
      "Amnion and Chorion",
      "Twinning Mechanisms",
      "Umbilical Cord",
      "Placental Abnormalities"
    ]
  },
  {
    "id": "pharyngeal-arches-skeletal-muscular",
    "title": "Pharyngeal arches, Skeletal & Muscular Systems",
    "description": "Pharyngeal arches play a crucial role in the development of the head and neck structures. The skeletal and muscular systems arise from mesodermal differentiation during embryogenesis.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "What structures are derived from each pharyngeal arch?",
      "How do the skeletal and muscular systems develop embryologically?",
      "What are common congenital anomalies associated with pharyngeal arches?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Pharyngeal Pouches",
      "Skeletal Myogenesis",
      "Neural Crest Cells",
      "Congenital Malformations",
      "Muscle Development"
    ]
  },
  {
    "id": "cardiovascular-respiratory-systems",
    "title": "Cardiovascular and Respiratory Systems",
    "description": "The cardiovascular and respiratory systems develop early in embryogenesis to support growing tissue demands. Their intricate formation lays the groundwork for postnatal survival.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "How does the embryonic heart develop and partition?",
      "What stages are involved in the development of the respiratory system?",
      "What are common congenital heart and lung defects?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Heart Tube",
      "Septation",
      "Lung Bud Formation",
      "Aortic Arch Derivatives",
      "Congenital Defects"
    ]
  },
  {
    "id": "alimentary-hepatobiliary-pancreas-spleen",
    "title": "Alimentary, Hepatobiliary systems, Pancreas and Spleen",
    "description": "The digestive tract and its associated organs develop from endoderm and mesoderm during embryogenesis. This process ensures proper digestion and metabolic functions after birth.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "How does the alimentary canal form and differentiate?",
      "What is the embryological origin of the liver, pancreas, and spleen?",
      "How do developmental anomalies of these organs manifest clinically?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Foregut, Midgut, Hindgut",
      "Liver and Pancreas Development",
      "Spleen Formation",
      "Gut Rotation",
      "Congenital Malformations"
    ]
  },
  {
    "id": "face-nose-palate-eye-ear",
    "title": "Face, Nose & Palate, Eye, Ear",
    "description": "Facial features, sensory organs, and the palate develop through complex embryological processes. Disruptions in these processes can result in congenital anomalies.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "What embryonic structures contribute to facial development?",
      "How do the eye and ear form during embryogenesis?",
      "What are common malformations of the palate and sensory organs?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Branchial Arches",
      "Palatogenesis",
      "Eye and Ear Development",
      "Craniofacial Anomalies",
      "Sensory Organogenesis"
    ]
  },
  {
    "id": "nervous-system-endocrine-glands",
    "title": "Nervous System and Endocrine Glands",
    "description": "The nervous system and endocrine glands originate from specialized embryonic tissues. Their formation is vital for coordinating body functions and hormonal regulation.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "How does the neural tube form and differentiate?",
      "What is the embryological basis of major endocrine glands?",
      "Which developmental errors can affect the nervous and endocrine systems?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Neurulation",
      "Neural Crest Cells",
      "Pituitary and Adrenal Glands",
      "Spinal Cord Development",
      "Neuroendocrine Integration"
    ]
  },
  {
    "id": "urogenital-system",
    "title": "Urogenital System",
    "description": "The urogenital system develops from intermediate mesoderm and involves complex differentiation of kidneys and reproductive organs. This development determines urinary and reproductive functions.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EMBRYOLOGY"],
    "questions": [
      "What are the stages of kidney development in the embryo?",
      "How do male and female reproductive organs differentiate?",
      "What are common congenital anomalies of the urogenital system?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Pronephros, Mesonephros, Metanephros",
      "Gonadal Development",
      "Urogenital Sinus",
      "Sex Differentiation",
      "Congenital Urological Disorders"
    ]
  },

  {
    "id": "cell-structure-epithelia-glands-connective-tissue",
    "title": "Cell Structure, Epithelia, Glands & Connective Tissue",
    "description": "Histology explores the microscopic structure of cells, epithelia, glands, and connective tissues. These components form the foundation of all organs and systems in the body.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HISTOLOGY"],
    "questions": [
      "How are different types of epithelia classified and what are their functions?",
      "What are the main components of connective tissue?",
      "How do glands develop and secrete their products?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cell Organelles",
      "Epithelial Types",
      "Exocrine and Endocrine Glands",
      "Connective Tissue Fibers",
      "Histological Techniques"
    ]
  },
  {
    "id": "bone-cartilage-muscular-tissue",
    "title": "Bone, Cartilage & Muscular Tissue",
    "description": "Bone, cartilage, and muscle tissues provide structural support and enable movement. Their unique microscopic features are essential for understanding growth, repair, and function.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HISTOLOGY"],
    "questions": [
      "What are the microscopic differences between bone and cartilage?",
      "How do muscle tissues differ in structure and function?",
      "What is the process of bone formation and remodeling?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Osteocytes and Chondrocytes",
      "Muscle Fiber Types",
      "Cartilage Types",
      "Bone Remodeling",
      "Histology of Muscle"
    ]
  },
  {
    "id": "nervous-endocrine-systems-histology",
    "title": "Nervous and Endocrine Systems",
    "description": "The nervous and endocrine systems rely on specialized cells and tissues to coordinate body functions. Histology reveals how these systems communicate and regulate physiological processes.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HISTOLOGY"],
    "questions": [
      "What are the key histological features of neurons and glial cells?",
      "How are endocrine glands organized at the microscopic level?",
      "What are the similarities and differences between neural and endocrine signaling?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Neurons and Glia",
      "Pituitary Gland Histology",
      "Adrenal Gland Histology",
      "Synaptic Transmission",
      "Hormone Secretion"
    ]
  },
  {
    "id": "cardiovascular-lymphatic-respiratory-histology",
    "title": "Cardiovascular, Lymphatic and Respiratory Systems",
    "description": "Histological study of the cardiovascular, lymphatic, and respiratory systems reveals the microanatomy essential for circulation and gas exchange. These structures ensure efficient transport and immune defense.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HISTOLOGY"],
    "questions": [
      "What are the histological layers of blood vessels and their functions?",
      "How is lung tissue specialized for gas exchange?",
      "What is the structure of lymphatic tissues and organs?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Blood Vessel Histology",
      "Alveolar Structure",
      "Lymph Node Histology",
      "Heart Muscle",
      "Respiratory Epithelium"
    ]
  },
  {
    "id": "digestive-hepatobiliary-genitourinary-histology",
    "title": "Digestive, Hepatobiliary & Genitourinary Systems",
    "description": "Histology examines the microscopic architecture of the digestive, hepatobiliary, and genitourinary systems. Understanding these tissues is key to diagnosing and managing disease.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HISTOLOGY"],
    "questions": [
      "What are the layers of the gastrointestinal tract wall?",
      "How do hepatocytes and kidney nephrons appear under the microscope?",
      "What histological changes are seen in common diseases of these systems?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "GI Tract Histology",
      "Liver and Bile Ducts",
      "Renal Histology",
      "Urothelium",
      "Pancreatic Tissue"
    ]
  },
  {
    "id": "skin-special-senses-eye-ear",
    "title": "Skin & Special Senses, Eye and Ear",
    "description": "The skin and sensory organs have specialized histological structures for protection and perception. Studying them reveals how we interact with the environment.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HISTOLOGY"],
    "questions": [
      "What are the main layers and cell types found in skin?",
      "How are taste buds and olfactory receptors organized histologically?",
      "What unique features are seen in the histology of the eye and ear?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Epidermis and Dermis",
      "Olfactory Epithelium",
      "Taste Buds",
      "Retina Histology",
      "Cochlea Structure"
    ]
  },

  {
    "id": "cranial-nerves",
    "title": "Cranial Nerves",
    "description": "Cranial nerves are twelve pairs of nerves that emerge from the brain and control vital sensory and motor functions. Their anatomy is essential for understanding head and neck innervation.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the names and primary functions of the twelve cranial nerves?",
      "How are cranial nerves classified based on their modalities?",
      "What clinical signs indicate damage to specific cranial nerves?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cranial Nerve Nuclei",
      "Sensory vs Motor Nerves",
      "Cranial Nerve Testing",
      "Cranial Nerve Pathways",
      "Common Lesions"
    ]
  },
  {
    "id": "meninges-dural-venous-sinuses",
    "title": "Meninges and dural venous sinuses",
    "description": "The meninges are protective coverings of the brain and spinal cord, while dural venous sinuses drain blood from the brain. Their integrity is crucial for neural protection and circulation.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the layers of the meninges and their functions?",
      "How do dural venous sinuses contribute to cerebral circulation?",
      "What conditions can result from meningeal or sinus pathology?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Dura Mater",
      "Arachnoid and Pia Mater",
      "Sinus Thrombosis",
      "CSF Circulation",
      "Meningeal Spaces"
    ]
  },
  {
    "id": "ventricular-system-subarachnoid-space",
    "title": "Ventricular System and Subarachnoid Space",
    "description": "The ventricular system produces and circulates cerebrospinal fluid (CSF), which cushions the brain. The subarachnoid space houses CSF and major blood vessels.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "How is CSF produced and circulated through the ventricular system?",
      "What is the clinical significance of the subarachnoid space?",
      "How do blockages in the ventricular system present clinically?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "CSF Production",
      "Lateral and Third Ventricles",
      "Aqueduct of Sylvius",
      "Arachnoid Granulations",
      "Hydrocephalus"
    ]
  },
  {
    "id": "cerebrum",
    "title": "Cerebrum",
    "description": "The cerebrum is the largest part of the brain, responsible for higher cognitive functions and voluntary actions. Its complex structure enables sensation, thought, and movement.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the main lobes and functional areas of the cerebrum?",
      "How is cortical organization related to brain function?",
      "What neurological deficits result from cerebral lesions?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cerebral Cortex",
      "Functional Lobes",
      "Corpus Callosum",
      "Broca’s and Wernicke’s Areas",
      "Cortical Lesions"
    ]
  },
  {
    "id": "white-matter-brain",
    "title": "White Matter of the Brain",
    "description": "White matter consists of myelinated nerve fibers that connect different brain regions. It enables rapid communication and integration of neural signals.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the major white matter tracts in the brain?",
      "How does myelination affect neural conduction?",
      "What are the effects of white matter diseases like multiple sclerosis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Commissural Fibers",
      "Projection Fibers",
      "Association Fibers",
      "Myelin Sheath",
      "Demyelinating Disorders"
    ]
  },
  {
    "id": "basal-ganglia-limbic-system",
    "title": "Basal Ganglia and Limbic System",
    "description": "The basal ganglia regulate movement, while the limbic system governs emotions and memory. Both are crucial for coordinated activity and behavioral responses.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the components and functions of the basal ganglia?",
      "How does the limbic system influence emotion and behavior?",
      "What disorders are associated with basal ganglia dysfunction?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Striatum",
      "Amygdala",
      "Hippocampus",
      "Parkinson’s Disease",
      "Emotion Regulation"
    ]
  },
  {
    "id": "diencephalon",
    "title": "Diencephalon",
    "description": "The diencephalon includes vital structures like the thalamus and hypothalamus, which relay sensory information and regulate homeostasis. It is a key integrative center in the brain.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the main subdivisions of the diencephalon and their functions?",
      "How does the hypothalamus regulate endocrine and autonomic functions?",
      "What is the role of the thalamus in sensory processing?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Thalamic Nuclei",
      "Hypothalamic Functions",
      "Pineal Gland",
      "Sensory Pathways",
      "Homeostatic Balance"
    ]
  },
  {
    "id": "brainstem",
    "title": "Brainstem",
    "description": "The brainstem connects the brain with the spinal cord and controls basic life functions like breathing and heart rate. Its nuclei are essential for vital reflexes and cranial nerve function.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the three main parts of the brainstem and their roles?",
      "How does the brainstem regulate autonomic functions?",
      "Which cranial nerves originate from the brainstem?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Midbrain",
      "Pons",
      "Medulla Oblongata",
      "Reticular Formation",
      "Vital Reflexes"
    ]
  },
  {
    "id": "cerebellum",
    "title": "Cerebellum",
    "description": "The cerebellum coordinates voluntary movements and maintains balance and posture. It fine-tunes motor activities through feedback from sensory systems.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the main anatomical subdivisions of the cerebellum?",
      "How does the cerebellum contribute to motor learning and coordination?",
      "What clinical signs indicate cerebellar dysfunction?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cerebellar Cortex",
      "Deep Cerebellar Nuclei",
      "Cerebellar Peduncles",
      "Ataxia",
      "Proprioception"
    ]
  },
  {
    "id": "vascular-supply-brain",
    "title": "Vascular supply of Brain",
    "description": "The brain’s blood supply is delivered through a complex arterial and venous network. Adequate vascularization is essential for neural function and survival.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What are the main arteries supplying the brain?",
      "How does the circle of Willis contribute to cerebral circulation?",
      "What are the consequences of vascular compromise in the brain?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Circle of Willis",
      "Cerebral Arteries",
      "Venous Drainage",
      "Blood-Brain Barrier",
      "Stroke Syndromes"
    ]
  },
  {
    "id": "spinal-cord",
    "title": "Spinal Cord",
    "description": "The spinal cord transmits neural signals between the brain and body and is involved in reflex actions. Its segmental organization is fundamental for sensory and motor function.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NEUROANATOMY"],
    "questions": [
      "What is the segmental organization of the spinal cord?",
      "How do ascending and descending tracts function within the spinal cord?",
      "What are the effects of spinal cord injury at different levels?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Spinal Tracts",
      "Gray and White Matter",
      "Reflex Arcs",
      "Dermatomes",
      "Spinal Cord Lesions"
    ]
  },
  {
    "id": "osteology-scalp-face",
    "title": "Osteology, Scalp and Face",
    "description": "The osteology of the head and neck includes the study of the skull bones that protect the brain and support facial structures. The scalp and face house vital sensory organs and play key roles in expression and communication.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEAD AND NECK"],
    "questions": [
      "What are the major bones of the skull and their functions?",
      "Which layers compose the human scalp?",
      "How do facial muscles contribute to expression and function?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cranial Bones",
      "Facial Muscles",
      "Scalp Layers",
      "Foramina of Skull",
      "Facial Nerve Supply"
    ]
  },
  {
    "id": "deep-fascia-triangles-neck",
    "title": "Deep fascia and Triangles of the neck",
    "description": "The deep fascia of the neck divides it into compartments, providing structural support and pathways for neurovascular bundles. The anatomical triangles of the neck help localize structures for clinical assessment.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEAD AND NECK"],
    "questions": [
      "What are the layers and functions of the deep cervical fascia?",
      "Which are the main triangles of the neck and their boundaries?",
      "How are neck triangles used in clinical examination and surgery?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Investing Fascia",
      "Carotid Triangle",
      "Submandibular Triangle",
      "Posterior Triangle",
      "Clinical Relevance"
    ]
  },
  {
    "id": "muscles-neurovascular-anatomy-head-neck",
    "title": "Muscles, Neurovascular Anatomy of Head & Neck",
    "description": "The head and neck contain intricate muscles for movement, speech, and swallowing, supported by a complex neurovascular network. Understanding these relationships is vital for diagnosing regional disorders.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEAD AND NECK"],
    "questions": [
      "Which muscles are involved in mastication and facial expression?",
      "What are the main arteries and nerves supplying the head and neck?",
      "How do neurovascular injuries in this region present clinically?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Facial Nerve",
      "Carotid Arteries",
      "Muscles of Mastication",
      "Venous Drainage",
      "Cranial Nerve Pathways"
    ]
  },
  {
    "id": "glands-head-neck",
    "title": "Glands of the Head and Neck",
    "description": "The head and neck region contains several important glands, such as the salivary and thyroid glands, which play key roles in digestion and metabolism. Their anatomy and function are crucial for maintaining overall health.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEAD AND NECK"],
    "questions": [
      "What are the locations and functions of salivary glands in the head and neck?",
      "How is the thyroid gland anatomically related to nearby structures?",
      "What clinical conditions can affect the glands of this region?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Parotid Gland",
      "Submandibular Gland",
      "Thyroid and Parathyroid Glands",
      "Lymphatic Drainage",
      "Hormonal Function"
    ]
  },
  {
    "id": "tongue-palate",
    "title": "Tongue and Palate",
    "description": "The tongue and palate are essential for speech, swallowing, and taste sensation. Their complex structure and innervation enable a wide range of movements and specialized functions.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEAD AND NECK"],
    "questions": [
      "What are the anatomical features and muscles of the tongue?",
      "How does the palate contribute to speech and swallowing?",
      "Which nerves supply the tongue and palate?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Intrinsic and Extrinsic Tongue Muscles",
      "Hard and Soft Palate",
      "Taste Buds",
      "Palatine Arches",
      "Innervation Patterns"
    ]
  },
  {
    "id": "pharynx",
    "title": "Pharynx",
    "description": "The pharynx is a muscular tube that connects the nasal and oral cavities to the esophagus and larynx. It plays a crucial role in both the respiratory and digestive systems.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEAD AND NECK"],
    "questions": [
      "What are the three parts of the pharynx and their functions?",
      "How does the pharynx facilitate swallowing and breathing?",
      "What are common clinical conditions affecting the pharynx?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Nasopharynx",
      "Oropharynx",
      "Laryngopharynx",
      "Pharyngeal Muscles",
      "Swallowing Mechanism"
    ]
  },
  {
    "id": "larynx",
    "title": "Larynx",
    "description": "The larynx, or voice box, houses the vocal cords and is essential for phonation, breathing, and airway protection. Its structure supports sound production and prevents aspiration.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEAD AND NECK"],
    "questions": [
      "What are the main cartilages and muscles of the larynx?",
      "How does the larynx contribute to voice production?",
      "Which nerves control laryngeal function and what are their clinical implications?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Vocal Cords",
      "Laryngeal Cartilages",
      "Intrinsic Laryngeal Muscles",
      "Recurrent Laryngeal Nerve",
      "Airway Protection"
    ]
  },
  {
    "id": "upper-limb-bones-joints",
    "title": "Upper Limb Bones and Joints",
    "description": "The bones and joints of the upper limb provide structural support and enable a wide range of movements. Understanding their anatomy is foundational for diagnosing injuries and disorders.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["UPPER LIMB"],
    "questions": [
      "What are the main bones and joints of the upper limb?",
      "How do the shoulder, elbow, and wrist joints differ in structure and function?",
      "What are common injuries involving upper limb bones and joints?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Humerus, Radius, Ulna",
      "Shoulder Joint",
      "Elbow and Wrist Joints",
      "Carpal Bones",
      "Joint Movements"
    ]
  },
  {
    "id": "fossae-spaces-upper-limb",
    "title": "Fossae and Spaces of the Upper Limb",
    "description": "The upper limb contains several anatomical fossae and spaces that serve as passageways for nerves and vessels. These regions are clinically important for access and diagnosis.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["UPPER LIMB"],
    "questions": [
      "What are the anatomical boundaries and contents of key upper limb fossae?",
      "How are spaces in the upper limb clinically significant?",
      "Which neurovascular structures pass through these spaces?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Axilla",
      "Cubital Fossa",
      "Anatomical Snuffbox",
      "Spaces of the Hand",
      "Neurovascular Bundles"
    ]
  },
  {
    "id": "breast",
    "title": "Breast",
    "description": "The breast is a modified sweat gland with important roles in lactation and sexual dimorphism. Its structure, blood supply, and lymphatic drainage are vital for understanding disease processes.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["UPPER LIMB"],
    "questions": [
      "What is the anatomical structure and blood supply of the breast?",
      "How is lymphatic drainage of the breast clinically significant?",
      "What are the key changes in breast tissue during lactation?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Mammary Glands",
      "Suspensory Ligaments",
      "Axillary Lymph Nodes",
      "Blood Supply",
      "Breast Pathology"
    ]
  },
  {
    "id": "brachial-plexus-nerves",
    "title": "Brachial Plexus and Nerves",
    "description": "The brachial plexus is a network of nerves that innervates the upper limb, providing both motor and sensory functions. Its detailed anatomy is crucial for diagnosing nerve injuries.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["UPPER LIMB"],
    "questions": [
      "What is the anatomical organization of the brachial plexus?",
      "How do brachial plexus injuries present clinically?",
      "Which muscles and skin regions are innervated by major nerves of the upper limb?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Roots, Trunks, Divisions, Cords",
      "Terminal Branches",
      "Nerve Lesions",
      "Sensory and Motor Innervation",
      "Clinical Syndromes"
    ]
  },
  {
    "id": "muscles-upper-limb",
    "title": "Muscles - Upper Limb",
    "description": "The upper limb muscles facilitate a variety of movements, from gross to fine motor skills. Their arrangement and innervation are key to understanding limb function and rehabilitation.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["UPPER LIMB"],
    "questions": [
      "What are the major muscle groups of the upper limb and their actions?",
      "How are the muscles of the arm and forearm organized?",
      "What nerves supply the upper limb muscles?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Flexor and Extensor Groups",
      "Intrinsic Hand Muscles",
      "Muscle Compartments",
      "Functional Movements",
      "Innervation Patterns"
    ]
  },
  {
    "id": "vessels-upper-limb",
    "title": "Vessels-Upper limb",
    "description": "The upper limb’s arterial and venous systems ensure the delivery of oxygen and nutrients and removal of waste. Knowledge of their course is essential for clinical procedures and trauma care.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["UPPER LIMB"],
    "questions": [
      "What are the main arteries and veins supplying the upper limb?",
      "How do the superficial and deep veins of the upper limb differ?",
      "What is the clinical significance of the vascular anatomy in the upper limb?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Brachial Artery",
      "Cephalic and Basilic Veins",
      "Deep and Superficial Venous Systems",
      "Arterial Pulse Points",
      "Vascular Access"
    ]
  },
  {
    "id": "general-anatomy-thorax",
    "title": "General Anatomy of Thorax",
    "description": "The thorax houses vital organs like the heart and lungs, protected by the rib cage. Its anatomy provides structural support and facilitates breathing and circulation.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["THORAX"],
    "questions": [
      "What are the main compartments and boundaries of the thorax?",
      "Which organs are located within the thoracic cavity?",
      "How does the thoracic wall contribute to respiration?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Thoracic Inlet and Outlet",
      "Rib Cage",
      "Thoracic Organs",
      "Diaphragm",
      "Mediastinum"
    ]
  },
  {
    "id": "thoracic-wall",
    "title": "Thoracic Wall",
    "description": "The thoracic wall consists of bones, muscles, and connective tissues that protect thoracic organs. It plays a critical role in breathing and supporting upper limb movement.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["THORAX"],
    "questions": [
      "What are the layers and components of the thoracic wall?",
      "How do the intercostal muscles aid in respiration?",
      "Which vessels and nerves supply the thoracic wall?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Ribs and Sternum",
      "Intercostal Spaces",
      "Intercostal Muscles",
      "Neurovascular Bundle",
      "Thoracic Wall Injuries"
    ]
  },
  {
    "id": "mediastinum",
    "title": "Mediastinum",
    "description": "The mediastinum is the central compartment of the thoracic cavity, containing the heart, great vessels, trachea, and esophagus. It divides the thorax and serves as a conduit for vital structures.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["THORAX"],
    "questions": [
      "What are the subdivisions of the mediastinum and their contents?",
      "How is the mediastinum clinically assessed?",
      "What conditions can affect the mediastinum?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Superior and Inferior Mediastinum",
      "Heart and Great Vessels",
      "Trachea and Esophagus",
      "Lymphatic Structures",
      "Mediastinal Pathologies"
    ]
  },
  {
    "id": "diaphragm",
    "title": "Diaphragm",
    "description": "The diaphragm is a dome-shaped muscle separating the thoracic and abdominal cavities. It is the primary muscle of respiration and is essential for breathing.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["THORAX"],
    "questions": [
      "What is the anatomical structure and function of the diaphragm?",
      "How does the diaphragm contribute to breathing mechanics?",
      "What are the major openings in the diaphragm and their clinical relevance?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Diaphragmatic Openings",
      "Nerve Supply (Phrenic Nerve)",
      "Diaphragmatic Movements",
      "Hernias of the Diaphragm",
      "Diaphragmatic Paralysis"
    ]
  },
  {
    "id": "heart",
    "title": "Heart",
    "description": "The heart is a muscular organ that pumps blood throughout the body via the circulatory system. Its chambers, valves, and vessels are vital for maintaining life.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["THORAX"],
    "questions": [
      "What are the anatomical features of the heart's chambers and valves?",
      "How is the heart supplied with blood and nerves?",
      "What is the clinical significance of the cardiac conduction system?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Chambers and Valves",
      "Coronary Circulation",
      "Cardiac Conduction System",
      "Pericardium",
      "Heart Sounds"
    ]
  },
  {
    "id": "lungs-pleura",
    "title": "Lungs and Pleura",
    "description": "The lungs are responsible for gas exchange, surrounded by the pleura which provides protection and lubrication. Their structure and function are critical for respiration.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["THORAX"],
    "questions": [
      "What are the anatomical divisions of the lungs?",
      "How does the pleura facilitate lung movement?",
      "What are common clinical conditions affecting the lungs and pleura?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Lobes and Segments of Lungs",
      "Pleural Cavities",
      "Bronchial Tree",
      "Pulmonary Circulation",
      "Pleural Effusion"
    ]
  },
  {
    "id": "anterior-abdominal-wall",
    "title": "Anterior Abdominal Wall",
    "description": "The anterior abdominal wall protects abdominal organs and supports movements like flexion and rotation. Its layered structure is important for surgical approaches and hernia formation.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ABDOMEN AND PELVIS"],
    "questions": [
      "What are the layers of the anterior abdominal wall?",
      "How does the abdominal wall facilitate movement and protection?",
      "What is the significance of anatomical landmarks in the abdomen?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Muscles of the Abdominal Wall",
      "Linea Alba",
      "Inguinal Canal",
      "Abdominal Fascia",
      "Hernias"
    ]
  },
  {
    "id": "abdominal-cavity-peritoneum",
    "title": "Abdominal cavity and Peritoneum",
    "description": "The abdominal cavity houses major digestive organs, lined by the peritoneum which reduces friction and supports organ function. Understanding its subdivisions aids in diagnosing abdominal diseases.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ABDOMEN AND PELVIS"],
    "questions": [
      "What are the major organs within the abdominal cavity?",
      "How is the peritoneum structured and what are its functions?",
      "What are common conditions involving the peritoneum?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Peritoneal Cavity",
      "Mesenteries",
      "Greater and Lesser Omentum",
      "Retroperitoneal Structures",
      "Ascites"
    ]
  },
  {
    "id": "gi-tract",
    "title": "GI Tract",
    "description": "The gastrointestinal (GI) tract is a continuous tube responsible for digestion and absorption of nutrients. Its segments are specialized for different digestive processes.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ABDOMEN AND PELVIS"],
    "questions": [
      "What are the main segments of the GI tract and their functions?",
      "How does the structure of each segment facilitate its role in digestion?",
      "What are common diseases affecting the GI tract?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Esophagus",
      "Stomach",
      "Small and Large Intestine",
      "GI Wall Layers",
      "Digestive Motility"
    ]
  },
  {
    "id": "hepatobiliary-spleen-pancreas",
    "title": "Hepatobiliary system, Spleen & Pancreas",
    "description": "The hepatobiliary system, spleen, and pancreas are key for metabolism, immunity, and digestion. Their anatomy and blood supply are crucial for understanding disease processes.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ABDOMEN AND PELVIS"],
    "questions": [
      "What are the anatomical features of the liver, gallbladder, spleen, and pancreas?",
      "How do these organs contribute to digestion and immunity?",
      "What is the clinical relevance of their blood supply?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Liver Lobes",
      "Biliary Tree",
      "Spleen Structure",
      "Pancreatic Ducts",
      "Portal Circulation"
    ]
  },
  {
    "id": "kub-adrenal-gland",
    "title": "KUB & Adrenal Gland",
    "description": "The kidneys, ureters, bladder (KUB), and adrenal glands are essential for filtration, excretion, and hormone production. Their anatomical relationships aid in understanding urinary and endocrine disorders.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ABDOMEN AND PELVIS"],
    "questions": [
      "What is the anatomical location of the KUB and adrenal glands?",
      "How do these organs function together in excretion and homeostasis?",
      "What are common clinical issues involving the KUB and adrenal glands?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Renal Anatomy",
      "Ureter Pathways",
      "Bladder Structure",
      "Adrenal Cortex and Medulla",
      "Urinary Tract Disorders"
    ]
  },
  {
    "id": "internal-external-genitalia",
    "title": "Internal and external genitalia",
    "description": "The internal and external genitalia are involved in reproduction and sexual function. Their anatomy varies between males and females and is essential for understanding clinical conditions.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ABDOMEN AND PELVIS"],
    "questions": [
      "What are the main anatomical structures of internal and external genitalia?",
      "How do these structures differ between sexes?",
      "What are common congenital or acquired disorders of the genitalia?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Male Reproductive Organs",
      "Female Reproductive Organs",
      "Developmental Anatomy",
      "Genitalia Disorders",
      "Pelvic Floor Muscles"
    ]
  },
  {
    "id": "pelvis-perineum",
    "title": "Pelvis & Perineum",
    "description": "The pelvis and perineum form the lower part of the trunk, supporting pelvic organs and enabling functions such as urination and childbirth. Their anatomy is key for surgical and clinical practice.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ABDOMEN AND PELVIS"],
    "questions": [
      "What are the bony and soft tissue components of the pelvis and perineum?",
      "How are the pelvic organs supported and protected?",
      "Which important structures pass through the perineum?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Pelvic Bones",
      "Pelvic Floor Muscles",
      "Perineal Pouches",
      "Pelvic Organs",
      "Childbirth Anatomy"
    ]
  },
  {
    "id": "bones-lower-limb",
    "title": "Bones of the Lower Limb",
    "description": "The bones of the lower limb provide strength and mobility for standing and walking. Their structure allows for weight-bearing and efficient locomotion.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOWER LIMB"],
    "questions": [
      "What are the major bones of the lower limb and their functions?",
      "How do the bones of the lower limb adapt to support weight?",
      "What are common fractures involving the lower limb bones?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Femur",
      "Tibia and Fibula",
      "Patella",
      "Foot Bones",
      "Bone Landmarks"
    ]
  },
  {
    "id": "joints-lower-limb",
    "title": "Joints of the Lower Limb",
    "description": "The joints of the lower limb, including the hip, knee, and ankle, enable movement and flexibility. Their anatomy is fundamental for understanding locomotion and injury.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOWER LIMB"],
    "questions": [
      "What are the main joints of the lower limb and their functions?",
      "How do ligaments and cartilage contribute to joint stability?",
      "What are common joint injuries in the lower limb?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Hip Joint",
      "Knee Joint",
      "Ankle Joint",
      "Ligaments and Menisci",
      "Joint Movements"
    ]
  },
  {
    "id": "muscles-lower-limb",
    "title": "Muscles of the Lower Limb",
    "description": "Lower limb muscles are responsible for movement, posture, and balance. Their groupings and attachments are key for diagnosing injuries and understanding biomechanics.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOWER LIMB"],
    "questions": [
      "What are the main muscle groups of the lower limb?",
      "How do these muscles contribute to movement and stability?",
      "What nerves supply the muscles of the lower limb?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Quadriceps",
      "Hamstrings",
      "Calf Muscles",
      "Gluteal Muscles",
      "Muscle Compartments"
    ]
  },
  {
    "id": "nerves-vessels-lower-limb",
    "title": "Nerves & Vessels of Lower Limb",
    "description": "The nerves and vessels of the lower limb supply muscles and skin, enabling movement and sensation. Their pathways are important for clinical procedures and trauma care.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOWER LIMB"],
    "questions": [
      "What are the main nerves and vessels of the lower limb?",
      "How do these structures travel through the lower limb?",
      "What is the clinical significance of neurovascular injuries in the lower limb?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Femoral Nerve",
      "Sciatic Nerve",
      "Femoral and Popliteal Arteries",
      "Venous Drainage",
      "Vascular Access"
    ]
  },
  {
    "id": "important-structures-lower-limb",
    "title": "Important Structures of Lower Limb",
    "description": "Several key anatomical structures in the lower limb are vital for movement, sensation, and clinical interventions. Understanding their location aids in diagnosis and treatment.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LOWER LIMB"],
    "questions": [
      "What are the important anatomical landmarks of the lower limb?",
      "How are these structures relevant in clinical examinations?",
      "Which structures are commonly involved in lower limb injuries?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Inguinal Ligament",
      "Popliteal Fossa",
      "Tarsal Tunnel",
      "Patellar Ligament",
      "Landmarks for Injections"
    ]
  },
  {
    "id": "vertebral-column",
    "title": "Vertebral Column",
    "description": "The vertebral column supports the body and protects the spinal cord. It is composed of individual vertebrae that allow flexibility and movement.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BACK"],
    "questions": [
      "What are the regions and curvatures of the vertebral column?",
      "How do vertebrae differ across regions?",
      "What are common conditions affecting the vertebral column?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cervical, Thoracic, Lumbar Vertebrae",
      "Intervertebral Discs",
      "Spinal Cord Protection",
      "Ligaments of the Spine",
      "Scoliosis and Kyphosis"
    ]
  },
  {
    "id": "bones-joints-cartilage",
    "title": "Bones, Joints and Cartilage",
    "description": "Bones, joints, and cartilage form the structural framework of the body. They enable movement, protect organs, and provide support for muscles and ligaments.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL ANATOMY"],
    "questions": [
      "What are the different types of bones and their functions?",
      "How are joints classified and what are their movements?",
      "What is the role of cartilage in the skeletal system?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Bone Structure",
      "Synovial Joints",
      "Cartilage Types",
      "Joint Movements",
      "Bone Growth"
    ]
  },
  {
    "id": "muscles-tendons",
    "title": "Muscles and Tendons",
    "description": "Muscles contract to produce movement, with tendons transmitting force to bones. Their anatomy is critical for understanding body mechanics and injury.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL ANATOMY"],
    "questions": [
      "What are the structural differences among muscle types?",
      "How do tendons connect muscles to bones?",
      "What are common injuries involving muscles and tendons?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Skeletal Muscle Structure",
      "Tendon Anatomy",
      "Muscle Contraction",
      "Tendinopathies",
      "Muscle Groups"
    ]
  },
  {
    "id": "cardiovascular-lymphatic-nervous-systems",
    "title": "Cardiovascular, Lymphatic and Nervous Systems",
    "description": "The cardiovascular, lymphatic, and nervous systems coordinate circulation, immunity, and signaling. Their integrated function maintains homeostasis and responds to environmental changes.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL ANATOMY"],
    "questions": [
      "What are the main components of each of these systems?",
      "How do the cardiovascular and lymphatic systems interact?",
      "What are the basic functional units of the nervous system?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Heart Anatomy",
      "Lymph Nodes",
      "Neuron Structure",
      "Blood Vessels",
      "Immune Response"
    ]
  },
  {
    "id": "skin-connective-tissue-ligaments",
    "title": "Skin, Connective Tissue and Ligaments",
    "description": "The skin is the body’s largest organ, while connective tissue and ligaments provide support and stability. Together, they protect organs and allow flexible movement.",
    "category": "Anatomy",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL ANATOMY"],
    "questions": [
      "What are the functions and layers of the skin?",
      "How do connective tissue and ligaments differ in structure and function?",
      "What is the clinical significance of ligament injuries?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Epidermis and Dermis",
      "Types of Connective Tissue",
      "Ligament Anatomy",
      "Skin Appendages",
      "Wound Healing"
    ]
  },
  {
    "id": "chemistry-carbohydrates-amino-mucopolysaccharides",
    "title": "Chemistry of Carbohydrates, Amino sugars and Mucopolysaccharides",
    "description": "Carbohydrates, amino sugars, and mucopolysaccharides are vital biomolecules with diverse structural and functional roles. Their chemistry underpins energy provision, cellular structure, and signaling.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARBOHYDRATES"],
    "questions": [
      "What are the structural differences between simple carbohydrates and mucopolysaccharides?",
      "How do amino sugars contribute to cellular structure and function?",
      "What is the biological significance of glycosaminoglycans?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Monosaccharides and Polysaccharides",
      "Glycosidic Bonds",
      "Glycosaminoglycans",
      "Chitin and Heparin",
      "Biological Functions of Sugars"
    ]
  },
  {
    "id": "glycolysis-gluconeogenesis",
    "title": "Glycolysis and gluconeogenesis",
    "description": "Glycolysis breaks down glucose to produce energy, while gluconeogenesis generates glucose from non-carbohydrate sources. Their reciprocal regulation maintains blood sugar homeostasis.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARBOHYDRATES"],
    "questions": [
      "What enzymes regulate the key steps in glycolysis and gluconeogenesis?",
      "How is gluconeogenesis essential during fasting?",
      "What are the energy yields of glycolysis versus gluconeogenesis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Key Glycolytic Enzymes",
      "Gluconeogenic Precursors",
      "Regulation by Hormones",
      "Cori Cycle",
      "Metabolic Disorders"
    ]
  },
  {
    "id": "glycogen-metabolism-storage-disorders",
    "title": "Glycogen metabolism and glycogen storage disorders",
    "description": "Glycogen metabolism involves the synthesis and breakdown of glycogen for rapid energy release. Defects in these pathways result in glycogen storage disorders with varied clinical presentations.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARBOHYDRATES"],
    "questions": [
      "What enzymes are essential for glycogen synthesis and degradation?",
      "How are glycogen storage diseases classified?",
      "What are the clinical features of common glycogen storage disorders?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Glycogenesis",
      "Glycogenolysis",
      "Key Enzymes (Glycogen Synthase, Phosphorylase)",
      "Von Gierke Disease",
      "McArdle Disease"
    ]
  },
  {
    "id": "hmp-shunt-fructose-galactose-metabolism",
    "title": "HMP shunt pathway, Fructose, Galactose metabolism",
    "description": "The HMP shunt generates NADPH and ribose, crucial for biosynthesis and antioxidant defense. Fructose and galactose metabolism are vital for energy and can be disrupted in inherited disorders.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARBOHYDRATES"],
    "questions": [
      "What is the significance of NADPH generated in the HMP shunt?",
      "How are fructose and galactose metabolized in the body?",
      "What disorders arise from defects in fructose or galactose metabolism?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Pentose Phosphate Pathway",
      "NADPH Functions",
      "Fructose Intolerance",
      "Galactosemia",
      "Oxidative Stress"
    ]
  },
  {
    "id": "etc-bioenergetics",
    "title": "ETC and bioenergetics",
    "description": "The electron transport chain (ETC) is the final stage of cellular respiration, generating ATP through oxidative phosphorylation. Bioenergetics studies the flow and transformation of energy in biological systems.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARBOHYDRATES"],
    "questions": [
      "How does the electron transport chain produce ATP?",
      "What are the roles of key complexes in the ETC?",
      "How is energy efficiency maintained in biological systems?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Oxidative Phosphorylation",
      "ATP Synthase",
      "Mitochondria",
      "Uncoupling Proteins",
      "Respiratory Chain Disorders"
    ]
  },
  {
    "id": "krebs-cycle",
    "title": "Krebs Cycle",
    "description": "The Krebs cycle, also known as the citric acid cycle, is a central metabolic pathway that oxidizes acetyl-CoA to produce energy, CO₂, and high-energy electron carriers. It links carbohydrate, fat, and protein metabolism.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARBOHYDRATES"],
    "questions": [
      "What are the main steps and enzymes of the Krebs cycle?",
      "How does the Krebs cycle integrate with other metabolic pathways?",
      "What is the clinical relevance of Krebs cycle intermediates?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Citric Acid Cycle Reactions",
      "Energy Yield",
      "Anaplerotic Reactions",
      "Amphibolic Nature",
      "Regulation of the Cycle"
    ]
  },
  {
    "id": "amino-acids-basics",
    "title": "Amino acids: Basics",
    "description": "Amino acids are the building blocks of proteins, each with unique properties and functions. Understanding their basic structure is fundamental to studying protein biochemistry.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AMINO ACIDS AND PROTEINS"],
    "questions": [
      "What is the general structure of an amino acid?",
      "How are amino acids classified based on their side chains?",
      "Why are some amino acids considered essential?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Amino Acid Structure",
      "Classification of Amino Acids",
      "Essential vs Non-Essential",
      "Zwitterions",
      "Peptide Bond Formation"
    ]
  },
  {
    "id": "amino-acid-metabolism",
    "title": "Amino acid: Metabolism",
    "description": "Amino acid metabolism encompasses their synthesis, degradation, and utilization for energy and biomolecule synthesis. Imbalances can lead to metabolic disorders and disease.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AMINO ACIDS AND PROTEINS"],
    "questions": [
      "How are amino acids metabolized in the body?",
      "What is transamination and its significance?",
      "How do amino acid metabolic pathways connect to the urea cycle?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Transamination",
      "Deamination",
      "Amino Acid Catabolism",
      "Glucogenic and Ketogenic Amino Acids",
      "Intermediary Metabolism"
    ]
  },
  {
    "id": "amino-acid-metabolic-disorder",
    "title": "Amino acid: Metabolic disorder",
    "description": "Disorders of amino acid metabolism are often inherited and lead to accumulation of toxic substances or deficiency in critical compounds. Early diagnosis and dietary management are key.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AMINO ACIDS AND PROTEINS"],
    "questions": [
      "What are common inherited disorders of amino acid metabolism?",
      "How do metabolic disorders like phenylketonuria manifest clinically?",
      "What are the principles of managing amino acid metabolic disorders?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Phenylketonuria (PKU)",
      "Maple Syrup Urine Disease",
      "Alkaptonuria",
      "Screening and Diagnosis",
      "Therapeutic Approaches"
    ]
  },
  {
    "id": "protein-structure-function",
    "title": "Protein structure and function",
    "description": "Proteins have complex structures that determine their diverse functions in the body. From enzymes to antibodies, their folding and interactions are crucial for biological activity.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AMINO ACIDS AND PROTEINS"],
    "questions": [
      "What are the four levels of protein structure?",
      "How does protein misfolding lead to disease?",
      "How do structure and function relate in enzymes and antibodies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Primary to Quaternary Structure",
      "Protein Folding",
      "Denaturation",
      "Structure-Function Relationship",
      "Protein Engineering"
    ]
  },
  {
    "id": "urea-cycle-disorders",
    "title": "Urea cycle and its disorders",
    "description": "The urea cycle detoxifies ammonia produced from amino acid breakdown by converting it to urea for excretion. Enzyme defects in this pathway cause hyperammonemia and neurological symptoms.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["AMINO ACIDS AND PROTEINS"],
    "questions": [
      "What are the key steps and enzymes of the urea cycle?",
      "How do urea cycle disorders manifest clinically?",
      "What are the treatment strategies for urea cycle defects?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Urea Cycle Enzymes",
      "Hyperammonemia",
      "Ornithine Transcarbamylase Deficiency",
      "Nitrogen Metabolism",
      "Clinical Management"
    ]
  },
  {
    "id": "lipids-basics",
    "title": "Lipids: Basics",
    "description": "Lipids are a diverse group of hydrophobic molecules essential for energy storage, membrane structure, and signaling. Their classification and functions are foundational topics in biochemistry.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LIPIDS"],
    "questions": [
      "How are lipids classified based on structure and function?",
      "What roles do lipids play in biological membranes?",
      "Why are essential fatty acids important for health?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Fatty Acids",
      "Triglycerides",
      "Phospholipids",
      "Steroids",
      "Lipid Functions"
    ]
  },
  {
    "id": "fatty-acid-oxidation-ketogenesis",
    "title": "Fatty acid oxidation and ketogenesis",
    "description": "Fatty acid oxidation breaks down fats for energy, especially during fasting. Ketogenesis produces ketone bodies, an alternative energy source for the brain and muscles.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LIPIDS"],
    "questions": [
      "What are the main steps of beta-oxidation?",
      "How is ketogenesis triggered in the body?",
      "What clinical conditions are associated with abnormal ketone production?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Beta-Oxidation",
      "Carnitine Shuttle",
      "Ketone Bodies",
      "Diabetic Ketoacidosis",
      "Energy Metabolism"
    ]
  },
  {
    "id": "biosynthesis-fatty-acids-eicosanoids",
    "title": "Biosynthesis of fatty acids and Eicosanoids",
    "description": "Fatty acid biosynthesis builds new fatty acids for storage and cellular functions. Eicosanoids, derived from fatty acids, act as potent signaling molecules in inflammation and immunity.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LIPIDS"],
    "questions": [
      "What enzymes are involved in fatty acid synthesis?",
      "How do eicosanoids influence inflammation and other physiological processes?",
      "What are the dietary sources of precursors for eicosanoid synthesis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Fatty Acid Synthase",
      "Prostaglandins",
      "Leukotrienes",
      "Regulation of Lipid Synthesis",
      "Dietary Fats"
    ]
  },
  {
    "id": "metabolism-acylglycerols-sphingolipids",
    "title": "Metabolism of Acylglycerols and Sphingolipids",
    "description": "Acylglycerols and sphingolipids are important for energy storage and membrane structure. Their metabolism is critical for normal cellular function and implicated in several diseases.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LIPIDS"],
    "questions": [
      "How are acylglycerols metabolized in the body?",
      "What roles do sphingolipids play in cell membranes?",
      "Which diseases are associated with sphingolipid metabolism disorders?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Triglyceride Metabolism",
      "Sphingomyelin",
      "Lipid Storage Diseases",
      "Membrane Structure",
      "Enzyme Defects"
    ]
  },
  {
    "id": "cholesterol-synthesis-transport-excretion",
    "title": "Cholesterol Synthesis, Transport and Excretion",
    "description": "Cholesterol is synthesized in the liver and transported in the blood as lipoproteins. Its regulation and excretion are vital for maintaining cardiovascular health.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["LIPIDS"],
    "questions": [
      "What are the main steps in cholesterol biosynthesis?",
      "How are lipoproteins involved in cholesterol transport?",
      "What mechanisms control cholesterol excretion from the body?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "HMG-CoA Reductase",
      "LDL and HDL",
      "Bile Acid Synthesis",
      "Cholesterol Homeostasis",
      "Hypercholesterolemia"
    ]
  },
  {
    "id": "porphyrins-bile-pigments",
    "title": "Porphyrins and bile pigments",
    "description": "Porphyrins are precursors to heme, essential for oxygen transport; bile pigments result from heme breakdown. Their metabolism is crucial for red blood cell function and bilirubin excretion.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENZYMES AND PORPHYRINS"],
    "questions": [
      "How is heme synthesized from porphyrins?",
      "What is the pathway of bilirubin metabolism?",
      "What disorders result from abnormal porphyrin or bile pigment metabolism?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Heme Synthesis",
      "Jaundice",
      "Bilirubin Metabolism",
      "Porphyrias",
      "Hemolysis"
    ]
  },
  {
    "id": "enzymes-mechanism-clinical-importance",
    "title": "Enzymes - Mechanism of Action & Clinical Importance",
    "description": "Enzymes accelerate biochemical reactions through specific mechanisms, making life possible. Their clinical importance lies in diagnosis, therapy, and understanding disease processes.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENZYMES AND PORPHYRINS"],
    "questions": [
      "How do enzymes lower the activation energy of reactions?",
      "What are some examples of clinically important enzymes?",
      "How are enzyme levels used in disease diagnosis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Enzyme Catalysis",
      "Active Site",
      "Isoenzymes",
      "Enzyme Deficiency Diseases",
      "Diagnostic Enzymology"
    ]
  },
  {
    "id": "enzyme-kinetics-regulation",
    "title": "Enzyme Kinetics and Regulation of Activity",
    "description": "Enzyme kinetics studies the rates of enzyme-catalyzed reactions and how they are regulated. Understanding this helps in drug development and disease management.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENZYMES AND PORPHYRINS"],
    "questions": [
      "What is the Michaelis-Menten equation and its significance?",
      "How do inhibitors affect enzyme activity?",
      "What mechanisms regulate enzyme activity in cells?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Michaelis-Menten Kinetics",
      "Enzyme Inhibition",
      "Allosteric Regulation",
      "Feedback Control",
      "Enzyme Assays"
    ]
  },
  {
    "id": "fat-soluble-vitamins",
    "title": "Fat soluble vitamins",
    "description": "Fat soluble vitamins (A, D, E, K) are essential for vision, bone health, antioxidant defense, and blood clotting. Their absorption and storage differ from water-soluble vitamins.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CLINICAL BIOCHEMISTRY & NUTRITION"],
    "questions": [
      "What are the functions of each fat soluble vitamin?",
      "How are fat soluble vitamins absorbed and stored?",
      "What are the clinical features of their deficiencies and excesses?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Vitamin A Metabolism",
      "Vitamin D and Calcium",
      "Vitamin E as Antioxidant",
      "Vitamin K and Clotting",
      "Hypervitaminosis"
    ]
  },
  {
    "id": "energy-releasing-vitamins",
    "title": "Energy releasing vitamins",
    "description": "Energy releasing vitamins, mainly B-complex, act as coenzymes in metabolic pathways. They are vital for converting food into usable cellular energy.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CLINICAL BIOCHEMISTRY & NUTRITION"],
    "questions": [
      "Which vitamins constitute the B-complex group?",
      "How do these vitamins participate in energy metabolism?",
      "What symptoms arise from B vitamin deficiencies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Thiamine and Riboflavin",
      "Niacin and NAD/NADP",
      "Pantothenic Acid",
      "Vitamin B6 and B12",
      "Energy Metabolism Disorders"
    ]
  },
  {
    "id": "hematopoietic-other-vitamins",
    "title": "Hematopoietic and other vitamins",
    "description": "Hematopoietic vitamins such as folate and B12 are crucial for blood cell formation. Other vitamins serve diverse roles in metabolism and health maintenance.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CLINICAL BIOCHEMISTRY & NUTRITION"],
    "questions": [
      "How do folate and vitamin B12 contribute to hematopoiesis?",
      "What are the consequences of deficiencies in hematopoietic vitamins?",
      "Which other vitamins play key metabolic roles?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Folate Metabolism",
      "Megaloblastic Anemia",
      "Vitamin C Function",
      "Vitamin Deficiency Symptoms",
      "Supplementation"
    ]
  },
  {
    "id": "antioxidants-minerals",
    "title": "Antioxidants & Minerals",
    "description": "Antioxidants protect cells from oxidative damage, while minerals serve as cofactors and structural elements in the body. Both are critical for health and disease prevention.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CLINICAL BIOCHEMISTRY & NUTRITION"],
    "questions": [
      "How do antioxidants neutralize free radicals?",
      "What are the key minerals required for human health?",
      "How do mineral deficiencies manifest clinically?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Free Radical Scavengers",
      "Selenium and Zinc",
      "Calcium and Bone Health",
      "Iron Metabolism",
      "Electrolyte Balance"
    ]
  },
  {
    "id": "basics-genetics-nucleotide-metabolism-disorders",
    "title": "Basics of genetics - Nucleotide metabolism and its disorders",
    "description": "Genetics explores the inheritance of traits, while nucleotide metabolism provides the building blocks for DNA and RNA. Disorders in these pathways can lead to immunodeficiency and gout.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENETICS"],
    "questions": [
      "How do genes encode and transmit hereditary information?",
      "What are the steps in nucleotide metabolism?",
      "Which diseases are caused by defects in nucleotide metabolism?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "DNA and RNA Structure",
      "Purine and Pyrimidine Metabolism",
      "Lesch-Nyhan Syndrome",
      "Gout",
      "Genetic Disorders"
    ]
  },
  {
    "id": "dna-organization-replication-repair",
    "title": "DNA organization, replication and repair",
    "description": "DNA organization, replication, and repair ensure the fidelity of genetic information through generations. These processes protect against mutations and maintain genomic stability.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENETICS"],
    "questions": [
      "How is DNA packaged within the nucleus?",
      "What are the steps and enzymes involved in DNA replication?",
      "How do cells repair DNA damage?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Chromatin Structure",
      "DNA Polymerases",
      "Replication Fork",
      "DNA Repair Mechanisms",
      "Mutations"
    ]
  },
  {
    "id": "rna-synthesis-processing-modification",
    "title": "RNA synthesis, processing and modification",
    "description": "RNA synthesis (transcription), processing, and modification produce functional RNA molecules from DNA templates. These steps are crucial for gene expression regulation.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENETICS"],
    "questions": [
      "What are the main steps in RNA synthesis and processing?",
      "How is RNA modified after transcription?",
      "Why are these processes critical for gene expression?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Transcription",
      "RNA Splicing",
      "5' Capping and Polyadenylation",
      "Non-coding RNAs",
      "Gene Expression Regulation"
    ]
  },
  {
    "id": "regulation-gene-expression",
    "title": "Regulation of gene expression",
    "description": "Regulation of gene expression controls when, where, and how much protein is produced from a gene. This allows cells to respond to signals and maintain function.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENETICS"],
    "questions": [
      "What mechanisms regulate gene expression in eukaryotes?",
      "How do transcription factors influence gene activity?",
      "What is the role of epigenetic modifications in gene regulation?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Transcription Factors",
      "Epigenetics",
      "Enhancers and Silencers",
      "Post-transcriptional Control",
      "Gene Silencing"
    ]
  },
  {
    "id": "molecular-genetics-recombinant-dna-genomic-technology",
    "title": "Molecular genetics, recombinant DNA & genomic technology",
    "description": "Molecular genetics and recombinant DNA technology allow manipulation and analysis of genes. Genomic technology has revolutionized diagnostics, therapy, and biological research.",
    "category": "Biochemistry",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENETICS"],
    "questions": [
      "What are the basic tools and steps in recombinant DNA technology?",
      "How has genomic technology advanced medical diagnostics?",
      "What are the ethical considerations of genetic engineering?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Restriction Enzymes",
      "Polymerase Chain Reaction (PCR)",
      "Gene Cloning",
      "Gene Therapy",
      "Genomic Sequencing"
    ]
  }, {
    "id": "history-of-medicine",
    "title": "History of Medicine",
    "description": "The history of medicine traces the evolution of healthcare practices, from ancient remedies to modern scientific advances. It offers insights into how cultural, social, and scientific changes have shaped medical knowledge.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HISTORY OF MEDICINE"],
    "questions": [
      "How has the practice of medicine evolved over centuries?",
      "What were major milestones in the development of modern medicine?",
      "How did ancient civilizations contribute to medical knowledge?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Ancient Medical Systems",
      "Medical Discoveries",
      "Evolution of Hospitals",
      "Medical Ethics",
      "Public Health Movements"
    ]
  },
  {
    "id": "health-determinants-indicators",
    "title": "Health Determinants and Indicators",
    "description": "Health determinants are factors that influence an individual's health status, while indicators are measurable variables used to assess the health of populations. Both are essential for planning effective public health strategies.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CONCEPTS OF HEALTH AND DISEASE"],
    "questions": [
      "What are the main determinants of health in a community?",
      "How are health indicators used to measure population health?",
      "What is the difference between morbidity and mortality indicators?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Social Determinants of Health",
      "Health Metrics",
      "Quality of Life Indicators",
      "Epidemiological Surveillance",
      "Global Health Indices"
    ]
  },
  {
    "id": "concepts-disease-prevention",
    "title": "Concepts of Disease and Prevention",
    "description": "Understanding the concepts of disease and prevention is crucial for identifying risk factors and implementing control measures. Prevention strategies are categorized as primary, secondary, and tertiary.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CONCEPTS OF HEALTH AND DISEASE"],
    "questions": [
      "What are the different levels of disease prevention?",
      "How does the natural history of disease inform prevention strategies?",
      "What is the role of screening in disease prevention?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Disease Causation",
      "Natural History of Disease",
      "Levels of Prevention",
      "Risk Factors",
      "Screening Programs"
    ]
  },
  {
    "id": "principles-epidemiology",
    "title": "Principles of Epidemiology",
    "description": "Epidemiology is the study of the distribution and determinants of health-related events in populations. Its principles guide public health interventions and disease control.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What are the core functions of epidemiology?",
      "How does epidemiology contribute to disease prevention?",
      "What are the main types of epidemiological studies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Epidemiological Triad",
      "Study Designs",
      "Measures of Disease Frequency",
      "Outbreak Investigation",
      "Public Health Surveillance"
    ]
  },
  {
    "id": "descriptive-epidemiology",
    "title": "Descriptive Epidemiology",
    "description": "Descriptive epidemiology involves characterizing the distribution of diseases by time, place, and person. It forms the foundation for identifying health patterns and generating hypotheses.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What are the key elements of descriptive epidemiology?",
      "How do epidemiologists use person, place, and time variables?",
      "Why is descriptive epidemiology important in public health?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Epidemiological Variables",
      "Disease Mapping",
      "Incidence and Prevalence",
      "Data Collection Methods",
      "Health Trends Analysis"
    ]
  },
  {
    "id": "analytical-epidemiology",
    "title": "Analytical Epidemiology",
    "description": "Analytical epidemiology investigates the causes and risk factors of diseases by testing hypotheses. It uses comparative studies like case-control and cohort designs.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What is the purpose of analytical epidemiology?",
      "How do case-control and cohort studies differ?",
      "What are the strengths and limitations of analytical studies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Case-Control Studies",
      "Cohort Studies",
      "Bias and Confounding",
      "Measures of Association",
      "Statistical Analysis"
    ]
  },
  {
    "id": "experimental-epidemiology",
    "title": "Experimental Epidemiology",
    "description": "Experimental epidemiology involves manipulating variables to study their effects on health outcomes. Clinical trials and intervention studies are key methods in this field.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What are the key features of experimental epidemiology?",
      "How are randomized controlled trials designed and conducted?",
      "What ethical considerations are important in experimental studies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Randomized Controlled Trials",
      "Blinding and Placebo",
      "Field Trials",
      "Intervention Evaluation",
      "Ethics in Research"
    ]
  },
  {
    "id": "basic-definitions-infectious-disease-epidemiology",
    "title": "Basic Definitions in Infectious Disease Epidemiology",
    "description": "Basic definitions in infectious disease epidemiology clarify terms like incidence, prevalence, and outbreak. These concepts are essential for accurate disease monitoring and control.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What is the difference between incidence and prevalence?",
      "How is an outbreak defined in epidemiology?",
      "What do terms like endemic, epidemic, and pandemic mean?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Incidence vs Prevalence",
      "Epidemic Classifications",
      "Outbreak Investigation",
      "Disease Surveillance",
      "Case Definition"
    ]
  },
  {
    "id": "dynamics-disease-transmission",
    "title": "Dynamics of Disease Transmission",
    "description": "The dynamics of disease transmission explain how infections spread within populations. Understanding modes and factors of transmission is vital for effective control strategies.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What are the main modes of disease transmission?",
      "How does the basic reproductive number (R0) influence outbreaks?",
      "What factors affect the transmission of infectious diseases?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Direct and Indirect Transmission",
      "R0 and Herd Immunity",
      "Transmission Chains",
      "Environmental Factors",
      "Interrupting Transmission"
    ]
  },
  {
    "id": "principles-immunization-vaccination",
    "title": "Principles of Immunization and Vaccination",
    "description": "Immunization and vaccination protect individuals and communities from infectious diseases. Understanding their principles is key for designing effective immunization programs.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What is the difference between active and passive immunization?",
      "How do vaccines stimulate immune protection?",
      "Why is herd immunity important in vaccination programs?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Types of Vaccines",
      "Immunity Mechanisms",
      "Vaccine Schedules",
      "Cold Chain Management",
      "Adverse Events Following Immunization"
    ]
  },
  {
    "id": "vaccine-production-storage",
    "title": "Vaccine Production and Storage",
    "description": "Vaccine production follows stringent processes to ensure efficacy and safety. Proper storage is critical to maintain potency and prevent vaccine-preventable diseases.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What are the key steps in vaccine production?",
      "How is vaccine storage managed in the cold chain?",
      "What are the consequences of improper vaccine storage?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Vaccine Manufacturing",
      "Quality Control",
      "Cold Chain Equipment",
      "Storage Guidelines",
      "Vaccine Logistics"
    ]
  },
  {
    "id": "sterilization-disinfection",
    "title": "Sterilization and Disinfection",
    "description": "Sterilization and disinfection are vital processes to prevent infection in healthcare and community settings. They involve eliminating or reducing harmful microorganisms on surfaces and instruments.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY"],
    "questions": [
      "What is the difference between sterilization and disinfection?",
      "What are common methods used for sterilization in healthcare?",
      "How is disinfection applied in community settings?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Physical Methods",
      "Chemical Disinfectants",
      "Aseptic Techniques",
      "Instrument Reprocessing",
      "Infection Control"
    ]
  },
  {
    "id": "screening",
    "title": "Screening",
    "description": "Screening involves identifying asymptomatic individuals at risk of disease through simple tests. It enables early detection and intervention, improving health outcomes.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SCREENING"],
    "questions": [
      "What are the principles of an effective screening program?",
      "How is sensitivity and specificity important in screening tests?",
      "What are the potential harms and benefits of screening?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Screening Tests",
      "Sensitivity & Specificity",
      "Predictive Values",
      "Population Screening",
      "Ethical Considerations"
    ]
  },
  {
    "id": "viral-respiratory-infections",
    "title": "Viral Respiratory Infections",
    "description": "Viral respiratory infections are common communicable diseases affecting the lungs and airways. They range from mild colds to severe illnesses like influenza and COVID-19.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF COMMUNICABLE DISEASES"],
    "questions": [
      "What viruses commonly cause respiratory infections?",
      "How are viral respiratory infections transmitted and prevented?",
      "What are the public health measures for controlling outbreaks?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Influenza",
      "COVID-19",
      "Transmission Routes",
      "Vaccine Strategies",
      "Outbreak Response"
    ]
  },
  {
    "id": "bacterial-respiratory-infections",
    "title": "Bacterial Respiratory Infections",
    "description": "Bacterial respiratory infections can cause pneumonia, bronchitis, and other serious illnesses. Prompt diagnosis and appropriate antibiotics are key for effective management.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF COMMUNICABLE DISEASES"],
    "questions": [
      "What are the common bacterial agents of respiratory infections?",
      "How do symptoms differ between viral and bacterial respiratory diseases?",
      "What are the strategies for preventing bacterial respiratory infections?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Pneumonia",
      "Tuberculosis",
      "Antibiotic Resistance",
      "Vaccination",
      "Prevention Measures"
    ]
  },
  {
    "id": "intestinal-infections",
    "title": "Intestinal Infections",
    "description": "Intestinal infections are caused by bacteria, viruses, or parasites and lead to diarrhea and other gastrointestinal symptoms. Clean water, sanitation, and hygiene are key for prevention.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF COMMUNICABLE DISEASES"],
    "questions": [
      "What are the main causes of intestinal infections?",
      "How are intestinal infections transmitted and controlled?",
      "What are the complications of untreated intestinal infections?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Diarrheal Diseases",
      "Waterborne Infections",
      "Oral Rehydration Therapy",
      "Sanitation",
      "Preventive Measures"
    ]
  },
  {
    "id": "arthropod-borne-infections",
    "title": "Arthropod-Borne Infections",
    "description": "Arthropod-borne infections are transmitted by vectors like mosquitoes and ticks. They cause diseases such as malaria, dengue, and Lyme disease, posing significant public health challenges.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF COMMUNICABLE DISEASES"],
    "questions": [
      "Which diseases are transmitted by arthropods?",
      "How can vector control reduce arthropod-borne diseases?",
      "What are the challenges in diagnosing and managing these infections?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Vector Biology",
      "Malaria",
      "Dengue",
      "Vector Control Measures",
      "Surveillance"
    ]
  },
  {
    "id": "zoonotic-infections-viral",
    "title": "Zoonotic Infections - Viral",
    "description": "Zoonotic viral infections are diseases transmitted from animals to humans, such as rabies and Ebola. They require coordinated surveillance and prevention strategies.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF COMMUNICABLE DISEASES"],
    "questions": [
      "What are examples of viral zoonotic infections?",
      "How are zoonotic infections detected and managed?",
      "What measures can prevent zoonotic transmission?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Rabies",
      "Ebola",
      "Reservoir Hosts",
      "One Health Approach",
      "Prevention Strategies"
    ]
  },
  {
    "id": "zoonotic-infections-bacterial-parasitic",
    "title": "Zoonotic Infections - Bacterial & Parasitic",
    "description": "Bacterial and parasitic zoonoses are infections transmitted from animals, often via food, water, or vectors. Awareness and preventive action are crucial for control.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF COMMUNICABLE DISEASES"],
    "questions": [
      "What are common bacterial and parasitic zoonoses?",
      "How do humans become infected with these zoonoses?",
      "What are the public health interventions for zoonotic control?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Leptospirosis",
      "Toxoplasmosis",
      "Zoonotic Foodborne Infections",
      "Animal Reservoirs",
      "Prevention Programs"
    ]
  },
  {
    "id": "stds-surface-infections",
    "title": "STDs and Surface Infections",
    "description": "Sexually transmitted diseases (STDs) and surface infections affect skin and mucous membranes. Prevention, early diagnosis, and treatment are key to reducing their impact.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF COMMUNICABLE DISEASES"],
    "questions": [
      "What are the major STDs and how are they transmitted?",
      "How can surface infections be prevented and managed?",
      "What public health interventions reduce STD incidence?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "HIV/AIDS",
      "Syphilis",
      "Skin Infections",
      "Safe Sex Practices",
      "Contact Tracing"
    ]
  },
  {
    "id": "ncd-cardiovascular-diabetes",
    "title": "Non-Communicable Diseases - Cardiovascular Diseases and Diabetes",
    "description": "Cardiovascular diseases and diabetes are major non-communicable diseases with significant global burden. Lifestyle modifications and early detection are crucial for prevention and management.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF NON-COMMUNICABLE DISEASES"],
    "questions": [
      "What risk factors contribute to cardiovascular diseases and diabetes?",
      "How can these diseases be prevented at the community level?",
      "What are the challenges in managing chronic NCDs?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Hypertension",
      "Type 2 Diabetes",
      "Lifestyle Interventions",
      "Screening Programs",
      "Chronic Disease Management"
    ]
  },
  {
    "id": "ncd-cancer-obesity-blindness",
    "title": "Non-Communicable Diseases - Cancer, Obesity and Blindness",
    "description": "Cancer, obesity, and blindness are important NCDs with significant social and economic impact. Early intervention and awareness can help reduce their prevalence and complications.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["EPIDEMIOLOGY OF NON-COMMUNICABLE DISEASES"],
    "questions": [
      "What are the main causes and risk factors for cancer, obesity, and blindness?",
      "How are these NCDs prevented and managed?",
      "What are the global trends in NCDs like cancer and obesity?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cancer Screening",
      "Obesity Prevention",
      "Causes of Blindness",
      "Behavioral Risk Factors",
      "Rehabilitation Services"
    ]
  },
  {
    "id": "national-health-programmes-i-nvbdcp",
    "title": "National Health Programmes I - NVBDCP",
    "description": "The National Vector Borne Disease Control Programme (NVBDCP) addresses malaria, dengue, and other vector-borne diseases in India. It focuses on prevention, surveillance, and vector control.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["INDIAN HEALTH PROGRAMMES"],
    "questions": [
      "What are the objectives of the NVBDCP?",
      "How does the NVBDCP control vector-borne diseases?",
      "What challenges does the programme face in implementation?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Malaria Control",
      "Dengue Surveillance",
      "Vector Management",
      "Public Health Campaigns",
      "Programme Evaluation"
    ]
  },
  {
    "id": "national-health-programmes-ii-nlep-ntep-naco",
    "title": "National Health Programmes II - NLEP, NTEP & NACO",
    "description": "National health programmes like NLEP, NTEP, and NACO target leprosy, tuberculosis, and HIV/AIDS respectively. They provide specialized services and promote awareness to control these diseases.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["INDIAN HEALTH PROGRAMMES"],
    "questions": [
      "What are the main goals of NLEP, NTEP, and NACO?",
      "How are these programmes structured for disease control?",
      "What are the achievements and challenges of these initiatives?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Leprosy Elimination",
      "TB Control Strategies",
      "HIV/AIDS Prevention",
      "Programme Implementation",
      "Public Health Outreach"
    ]
  },
  {
    "id": "national-health-programmes-iii-nis-jsy-rbsk",
    "title": "National Health Programmes III - NIS, JSY, RBSK and Others",
    "description": "National health initiatives like NIS, JSY, and RBSK focus on immunization, maternal care, and child health. These programmes enhance health outcomes and reduce mortality rates.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["INDIAN HEALTH PROGRAMMES"],
    "questions": [
      "What are the objectives of NIS, JSY, and RBSK?",
      "How do these programmes improve maternal and child health?",
      "What challenges are faced in their nationwide implementation?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Universal Immunization",
      "Safe Motherhood Initiatives",
      "Child Health Screening",
      "Programme Monitoring",
      "Community Engagement"
    ]
  },
  {
    "id": "demography-i-demographic-cycle-growth-rate-age-pyramid",
    "title": "Demography I: Demographic Cycle, Annual Growth Rate and Age Pyramid",
    "description": "Demography studies population structure and changes using tools like the demographic cycle, growth rates, and age pyramids. These concepts guide effective health planning.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["DEMOGRAPHY AND FAMILY PLANNING"],
    "questions": [
      "What are the stages in the demographic cycle?",
      "How is annual population growth rate calculated?",
      "What information does an age pyramid provide?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Population Dynamics",
      "Demographic Transition",
      "Fertility and Mortality",
      "Population Pyramids",
      "Health Planning"
    ]
  },
  {
    "id": "demography-ii-demographic-indicators",
    "title": "Demography II: Demographic indicators",
    "description": "Demographic indicators like birth, death, and fertility rates help evaluate population trends. They are essential for designing and assessing public health interventions.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["DEMOGRAPHY AND FAMILY PLANNING"],
    "questions": [
      "What are the main demographic indicators used in public health?",
      "How do demographic indicators influence health policy?",
      "What are the limitations of demographic data?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Crude Birth Rate",
      "Infant Mortality Rate",
      "Fertility Rate",
      "Demographic Surveys",
      "Health Policy"
    ]
  },
  {
    "id": "family-planning",
    "title": "Family Planning",
    "description": "Family planning enables individuals and couples to determine the number and spacing of their children. It improves maternal and child health through informed choices.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["DEMOGRAPHY AND FAMILY PLANNING"],
    "questions": [
      "What are the methods of family planning?",
      "How does family planning benefit communities?",
      "What barriers exist to effective family planning?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Contraceptive Methods",
      "Reproductive Health",
      "Counseling Services",
      "Population Control",
      "Health Education"
    ]
  },
  {
    "id": "preventive-obstetrics-pediatrics-geriatrics",
    "title": "Preventive Obstetrics, Pediatrics and Geriatrics",
    "description": "Preventive strategies in obstetrics, pediatrics, and geriatrics focus on early detection and intervention. They improve health outcomes for mothers, children, and the elderly.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["PREVENTIVE OBSTETRICS, PEDIATRICS AND GERIATRICS"],
    "questions": [
      "What preventive measures are key in obstetrics, pediatrics, and geriatrics?",
      "How do preventive strategies differ across age groups?",
      "Why is early intervention important for vulnerable populations?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Antenatal Care",
      "Immunization Schedules",
      "Geriatric Screening",
      "Nutritional Support",
      "Health Education"
    ]
  },
  {
    "id": "energy-metabolism-macronutrients",
    "title": "Energy Metabolism and Macronutrients",
    "description": "Energy metabolism involves the biochemical processes that convert food into usable energy. Macronutrients—carbohydrates, proteins, and fats—are the primary sources for this energy.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NUTRITION AND HEALTH"],
    "questions": [
      "What roles do macronutrients play in energy metabolism?",
      "How is energy balance maintained in the body?",
      "What are the consequences of macronutrient deficiencies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Carbohydrates",
      "Proteins",
      "Fats",
      "Basal Metabolic Rate",
      "Dietary Recommendations"
    ]
  },
  {
    "id": "micronutrients-water",
    "title": "Micronutrients and Water",
    "description": "Micronutrients such as vitamins and minerals, along with water, are essential for proper physiological functioning. Their deficiency can lead to serious health problems.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NUTRITION AND HEALTH"],
    "questions": [
      "What are the main types of micronutrients needed for health?",
      "How does water support bodily functions?",
      "What are the signs of micronutrient deficiencies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Vitamins",
      "Minerals",
      "Hydration",
      "Micronutrient Deficiency Disorders",
      "Supplementation"
    ]
  },
  {
    "id": "food-quality-processing",
    "title": "Food Quality and Processing",
    "description": "Food quality and processing affect the nutritional value and safety of what we eat. Proper food handling and processing techniques prevent contamination and nutrient loss.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NUTRITION AND HEALTH"],
    "questions": [
      "How does food processing impact nutritional quality?",
      "What are the common methods for ensuring food safety?",
      "How can food fortification improve public health?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Food Preservation",
      "Food Fortification",
      "Nutrient Loss",
      "Food Safety Standards",
      "Contaminants"
    ]
  },
  {
    "id": "concepts-sociology-psychology",
    "title": "Concepts of Sociology and Psychology",
    "description": "Sociology and psychology explore how social and psychological factors influence health behaviors. Understanding these concepts aids in designing effective health interventions.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["MEDICINE AND SOCIAL SCIENCES"],
    "questions": [
      "How do social factors impact health outcomes?",
      "What psychological factors influence health behaviors?",
      "Why is understanding sociology important for public health?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Social Determinants",
      "Behavioral Change Theories",
      "Cultural Influences",
      "Mental Health",
      "Community Engagement"
    ]
  },
  {
    "id": "social-organization-economics",
    "title": "Social Organization and Economics",
    "description": "Social organization and economics shape health systems and access to care. Economic disparities and social structures influence community health outcomes.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["MEDICINE AND SOCIAL SCIENCES"],
    "questions": [
      "What is the relationship between social organization and health?",
      "How do economic factors affect health equity?",
      "What are examples of social determinants impacting healthcare access?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Health Economics",
      "Social Stratification",
      "Resource Allocation",
      "Healthcare Access",
      "Poverty and Health"
    ]
  },
  {
    "id": "water-i-sources-purification",
    "title": "Water - I: Sources and purification of water",
    "description": "Water sources can be natural or artificial, and purification is essential to ensure safety for consumption. Proper purification prevents waterborne diseases and maintains community health.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "What are the main sources of water for communities?",
      "How is water purified for safe consumption?",
      "Why is water purification important in public health?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Surface and Ground Water",
      "Purification Methods",
      "Waterborne Diseases",
      "Water Safety Standards",
      "Community Water Supply"
    ]
  },
  {
    "id": "water-ii-disinfection",
    "title": "Water- II: Disinfection of water",
    "description": "Disinfection of water involves removing or killing harmful microorganisms to make water safe. Various methods like chlorination and boiling are used to ensure potable water.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "What are the common methods of water disinfection?",
      "How does chlorination work in water treatment?",
      "What are the public health impacts of unsafe water?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Chlorination",
      "Boiling",
      "UV Treatment",
      "Microbial Contaminants",
      "Safe Water Practices"
    ]
  },
  {
    "id": "water-iii-quality-standards",
    "title": "Water - III: Water Quality and Standards",
    "description": "Water quality standards ensure that water is safe for drinking and use. They set limits for contaminants and guide monitoring practices for community health.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "What parameters define water quality?",
      "How are water quality standards established and enforced?",
      "What are the health risks of poor water quality?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Physical and Chemical Parameters",
      "Microbiological Standards",
      "Monitoring Techniques",
      "Water Quality Guidelines",
      "Health Implications"
    ]
  },
  {
    "id": "environmental-meteorology",
    "title": "Environmental Meteorology",
    "description": "Environmental meteorology studies weather and climate effects on human health. It helps in predicting disease outbreaks and planning health interventions.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "How does weather influence the spread of diseases?",
      "What is the role of meteorology in public health planning?",
      "How do climate changes impact community health?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Weather Patterns",
      "Climate Change",
      "Vector-Borne Diseases",
      "Disaster Preparedness",
      "Heat Waves and Health"
    ]
  },
  {
    "id": "housing-ventilation",
    "title": "Housing and Ventilation",
    "description": "Proper housing and ventilation are key determinants of health, reducing the risk of respiratory diseases and enhancing well-being. Poor ventilation can lead to the spread of infections and indoor pollution.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "What are the health benefits of adequate housing and ventilation?",
      "How does poor ventilation affect disease transmission?",
      "What standards should be followed for healthy housing?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Housing Standards",
      "Ventilation Types",
      "Indoor Air Quality",
      "Overcrowding",
      "Building Design"
    ]
  },
  {
    "id": "light-sound-radiation",
    "title": "Light, Sound and Radiation",
    "description": "Light, sound, and radiation all influence health in various ways, from vision and hearing to radiation exposure risks. Environmental control of these factors is essential for public health.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "How does light exposure affect health and well-being?",
      "What are the health risks of excessive noise and radiation?",
      "What measures can reduce harmful environmental exposures?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Noise Pollution",
      "Radiation Hazards",
      "Lighting Standards",
      "Occupational Exposure",
      "Preventive Measures"
    ]
  },
  {
    "id": "waste-sewage-disposal",
    "title": "Waste and Sewage Disposal",
    "description": "Proper waste and sewage disposal prevents the spread of disease and protects environmental quality. Safe management practices are crucial for community health.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "What are the methods for safe waste disposal?",
      "How does improper sewage disposal affect health?",
      "What are the key principles of waste management in communities?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Solid Waste Management",
      "Sewage Treatment",
      "Sanitation",
      "Environmental Pollution",
      "Community Health Programs"
    ]
  },
  {
    "id": "medical-entomology-mosquitoes-flies",
    "title": "Medical Entomology - Mosquitoes and Flies",
    "description": "Medical entomology studies insects like mosquitoes and flies that transmit diseases. Controlling these vectors is vital for preventing outbreaks of vector-borne diseases.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "What diseases are transmitted by mosquitoes and flies?",
      "How can vector control reduce disease transmission?",
      "What are the life cycles of common disease vectors?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Malaria",
      "Filariasis",
      "Vector Control Methods",
      "Insect Life Cycles",
      "Public Health Campaigns"
    ]
  },
  {
    "id": "medical-entomology-ticks-fleas-mites",
    "title": "Medical Entomology - Ticks, Fleas and Mites",
    "description": "Ticks, fleas, and mites are vectors for several infectious diseases affecting humans. Their identification and control are important in community health.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "What diseases are associated with ticks, fleas, and mites?",
      "How are these arthropods identified and controlled?",
      "What are the challenges in managing vector-borne diseases?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Rickettsial Diseases",
      "Scabies",
      "Vector Surveillance",
      "Integrated Pest Management",
      "Public Awareness"
    ]
  },
  {
    "id": "methods-pest-control",
    "title": "Methods of Pest Control",
    "description": "Pest control involves various strategies to reduce or eliminate pests that threaten health. Effective pest management minimizes disease risk and improves living conditions.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENVIRONMENT AND HEALTH"],
    "questions": [
      "What methods are used for effective pest control?",
      "How does integrated pest management work?",
      "What are the environmental concerns of pest control chemicals?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Chemical Control",
      "Biological Control",
      "Mechanical Methods",
      "Integrated Management",
      "Safety Precautions"
    ]
  },
  {
    "id": "biomedical-waste-management",
    "title": "Biomedical Waste Management",
    "description": "Biomedical waste management ensures safe handling, treatment, and disposal of healthcare waste to prevent infection and environmental pollution. Adherence to guidelines is crucial for public health.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOMEDICAL WASTE MANAGEMENT"],
    "questions": [
      "What are the categories of biomedical waste?",
      "How is biomedical waste segregated and treated?",
      "What are the risks of improper biomedical waste management?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Segregation Practices",
      "Disposal Methods",
      "Regulatory Guidelines",
      "Infection Prevention",
      "Awareness Campaigns"
    ]
  },
  {
    "id": "disaster-management",
    "title": "Disaster Management",
    "description": "Disaster management includes planning, response, and recovery to minimize the impact of natural or man-made disasters. Community preparedness and coordination save lives.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["DISASTER MANAGEMENT"],
    "questions": [
      "What are the phases of disaster management?",
      "How can communities prepare for disasters?",
      "What is the role of healthcare in disaster response?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Risk Assessment",
      "Preparedness Planning",
      "Emergency Response",
      "Recovery and Rehabilitation",
      "Disaster Epidemiology"
    ]
  },
  {
    "id": "occupational-health-diseases",
    "title": "Occupational Health Diseases",
    "description": "Occupational health diseases arise from workplace exposures to physical, chemical, or biological hazards. Prevention and early detection protect worker health and productivity.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["OCCUPATIONAL HEALTH"],
    "questions": [
      "What are common occupational health diseases?",
      "How can occupational hazards be identified and managed?",
      "What preventive measures are important for worker safety?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Pneumoconiosis",
      "Occupational Cancers",
      "Hazard Identification",
      "Workplace Safety",
      "Health Surveillance"
    ]
  },
  {
    "id": "esi-factories-act",
    "title": "ESI and Factories Act",
    "description": "The Employee State Insurance (ESI) and Factories Act provide legal protection for worker health and welfare. They set standards for occupational safety, compensation, and social security.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["OCCUPATIONAL HEALTH"],
    "questions": [
      "What are the provisions of the ESI Act?",
      "How does the Factories Act promote worker safety?",
      "How are occupational health standards enforced?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "ESI Benefits",
      "Factory Safety Norms",
      "Legal Framework",
      "Worker Compensation",
      "Health Inspections"
    ]
  },
  {
    "id": "communication-health-education",
    "title": "Communication for Health Education",
    "description": "Effective communication is vital for health education, enabling behavior change and community participation. Tailored messages and channels improve public health outcomes.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["COMMUNICATION FOR HEALTH EDUCATION"],
    "questions": [
      "What are the key elements of health communication?",
      "How can health messages be made more effective?",
      "What barriers exist in health education communication?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Health Promotion",
      "Behavior Change Communication",
      "Media Channels",
      "Community Engagement",
      "Feedback Mechanisms"
    ]
  },
  {
    "id": "health-planning-management",
    "title": "Health Planning and Management",
    "description": "Health planning and management involve setting priorities, allocating resources, and evaluating health programs. They ensure effective delivery of healthcare services to communities.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEALTHCARE OF THE COMMUNITY"],
    "questions": [
      "What are the steps in the health planning process?",
      "How is health program management evaluated?",
      "Why is resource allocation important in healthcare?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Health Policy",
      "Needs Assessment",
      "Program Implementation",
      "Monitoring and Evaluation",
      "Resource Management"
    ]
  },
  {
    "id": "healthcare-india",
    "title": "Healthcare In India",
    "description": "Healthcare in India is a blend of public and private systems, providing services to a vast and diverse population. Challenges include accessibility, quality, and equity in health delivery.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEALTHCARE OF THE COMMUNITY"],
    "questions": [
      "What are the main features of India's healthcare system?",
      "How is healthcare structured at various levels in India?",
      "What reforms have improved healthcare outcomes in India?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Primary Health Care",
      "Public vs Private Sector",
      "Health Policies",
      "Healthcare Financing",
      "Recent Reforms"
    ]
  },
  {
    "id": "healthcare-india-iphs-2022-update",
    "title": "Healthcare in India- IPHS 2022 Update",
    "description": "The Indian Public Health Standards (IPHS) 2022 update sets benchmarks for healthcare facilities and services in India. These standards aim to improve quality and accessibility nationwide.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEALTHCARE OF THE COMMUNITY"],
    "questions": [
      "What are the key changes in the IPHS 2022 update?",
      "How do IPHS standards improve healthcare delivery?",
      "What challenges exist in implementing IPHS across India?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "IPHS Guidelines",
      "Facility Standards",
      "Quality Improvement",
      "Service Delivery",
      "National Health Policies"
    ]
  },
  {
    "id": "international-health",
    "title": "International Health",
    "description": "International health addresses global health issues and cross-border challenges. It involves cooperation among countries to control diseases, disasters, and improve health equity.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["INTERNATIONAL HEALTH"],
    "questions": [
      "What are the main concerns of international health?",
      "How do international organizations support global health?",
      "What are the challenges in achieving global health equity?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "WHO and Global Agencies",
      "Global Disease Surveillance",
      "International Health Regulations",
      "Cross-Border Collaboration",
      "Pandemic Preparedness"
    ]
  },
  {
    "id": "descriptive-statistics-i-probability-data",
    "title": "Descriptive Statistics I - Probability and Data",
    "description": "Descriptive statistics involves summarizing and interpreting data, while probability provides a framework for predicting outcomes. Both are foundational for biostatistical analysis in medicine.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What are the types of data used in statistics?",
      "How is probability applied in health research?",
      "What are the basic measures of descriptive statistics?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Data Types",
      "Probability Theory",
      "Statistical Measures",
      "Data Presentation",
      "Sampling Methods"
    ]
  },
  {
    "id": "descriptive-statistics-ii-measures-location",
    "title": "Descriptive Statistics II - Measures of Location",
    "description": "Measures of location, such as mean, median, and mode, describe the central tendency of data. They help summarize and interpret health information efficiently.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What are the differences between mean, median, and mode?",
      "How are measures of location calculated and interpreted?",
      "Why is central tendency important in health data analysis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Mean",
      "Median",
      "Mode",
      "Data Distribution",
      "Interpretation of Results"
    ]
  },
  {
    "id": "descriptive-statistics-iii-measures-dispersion",
    "title": "Descriptive Statistics III - Measures of Dispersion",
    "description": "Measures of dispersion, such as range and standard deviation, assess the spread of data around the central value. They provide insight into data variability and reliability.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What are common measures of dispersion in statistics?",
      "How do measures of dispersion complement measures of location?",
      "What does a high standard deviation indicate about a dataset?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Range",
      "Variance",
      "Standard Deviation",
      "Coefficient of Variation",
      "Data Interpretation"
    ]
  },
  {
    "id": "descriptive-statistics-iv-measures-position",
    "title": "Descriptive Statistics IV - Measures of Position",
    "description": "Measures of position, like percentiles and quartiles, locate individual values within a dataset. They are useful for interpreting scores and distributions in health studies.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What are percentiles and quartiles in statistics?",
      "How are measures of position used in health data analysis?",
      "Why are these measures important for interpreting test results?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Percentiles",
      "Quartiles",
      "Data Ranking",
      "Score Interpretation",
      "Health Assessment"
    ]
  },
  {
    "id": "inferential-statistics",
    "title": "Inferential Statistics",
    "description": "Inferential statistics allows researchers to draw conclusions about populations based on sample data. It uses probability theory to test hypotheses and make predictions.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What is the difference between descriptive and inferential statistics?",
      "How do confidence intervals help in inference?",
      "What are common tests used in inferential statistics?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Population and Sample",
      "Estimation",
      "Hypothesis Testing",
      "Statistical Significance",
      "Confidence Intervals"
    ]
  },
  {
    "id": "concepts-hypothesis-testing",
    "title": "Concepts in Hypothesis Testing",
    "description": "Hypothesis testing is a statistical method to assess evidence and make decisions. It involves formulating null and alternative hypotheses and determining statistical significance.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What are the steps in hypothesis testing?",
      "How are p-values and significance levels interpreted?",
      "What is the difference between Type I and Type II errors?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Null and Alternative Hypotheses",
      "P-value Interpretation",
      "Error Types",
      "Statistical Power",
      "Decision Making"
    ]
  },
  {
    "id": "tests-significance",
    "title": "Tests of Significance",
    "description": "Tests of significance determine whether observed differences in data are due to chance or real effects. They are essential tools in medical research and decision-making.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What are common tests of significance in statistics?",
      "How is statistical significance determined?",
      "When should parametric or non-parametric tests be used?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "t-test",
      "Chi-square Test",
      "ANOVA",
      "Non-parametric Tests",
      "Research Interpretation"
    ]
  },
  {
    "id": "correlational-predictive-techniques",
    "title": "Correlational and Predictive Techniques",
    "description": "Correlational and predictive techniques assess relationships between variables and forecast outcomes. These methods help identify risk factors and trends in health research.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What is correlation and how is it measured?",
      "How are predictive models used in public health?",
      "What are the limitations of correlational studies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Correlation Coefficient",
      "Regression Analysis",
      "Predictive Modeling",
      "Risk Factor Identification",
      "Trend Analysis"
    ]
  },
  {
    "id": "facets-clinical-research-biostatistics",
    "title": "Facets of Clinical Research and Biostatistics",
    "description": "Clinical research and biostatistics are intertwined, supporting evidence-based medicine. They guide study design, data analysis, and interpretation of findings.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["BIOSTATISTICS"],
    "questions": [
      "What are the phases of clinical research?",
      "How does biostatistics support clinical trials?",
      "Why is ethical conduct important in clinical studies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Clinical Trial Design",
      "Ethical Guidelines",
      "Data Analysis",
      "Evidence-Based Practice",
      "Research Reporting"
    ]
  },
  {
    "id": "mental-health",
    "title": "Mental Health",
    "description": "Mental health encompasses emotional, psychological, and social well-being. Promoting mental health reduces stigma, improves quality of life, and supports overall health.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["MENTAL HEALTH AND GENETICS"],
    "questions": [
      "What are the determinants of mental health?",
      "How can mental health be promoted in communities?",
      "What are common mental health disorders and their impact?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Mental Health Promotion",
      "Stigma Reduction",
      "Common Disorders",
      "Community Interventions",
      "Psychosocial Support"
    ]
  },
  {
    "id": "genetics-health",
    "title": "Genetics and Health",
    "description": "Genetics influences the risk and manifestation of many diseases. Understanding genetic factors aids in disease prevention, early diagnosis, and personalized medicine.",
    "category": "Community Medicine",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["MENTAL HEALTH AND GENETICS"],
    "questions": [
      "How do genetic factors affect health and disease?",
      "What is the role of genetic screening in public health?",
      "How can genetics be integrated into preventive medicine?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Genetic Disorders",
      "Screening Programs",
      "Genomic Medicine",
      "Ethical Considerations",
      "Personalized Healthcare"
    ]
  },
  {
    "id": "anatomy-physiology-skin",
    "title": "Anatomy & Physiology of Skin",
    "description": "The skin is the body's largest organ, providing a protective barrier and playing key roles in sensation, temperature regulation, and immunity. Its layered structure and specialized cells are essential for maintaining overall health.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["THE SKIN"],
    "questions": [
      "What are the main layers and cell types of the skin?",
      "How does the skin regulate body temperature and fluid loss?",
      "What are the primary functions of the skin in immunity?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Epidermis and Dermis",
      "Skin Appendages",
      "Barrier Function",
      "Cutaneous Circulation",
      "Sensory Receptors"
    ]
  },
  {
    "id": "dermatopathology-skin-lesions",
    "title": "Dermatopathology of Skin Lesions",
    "description": "Dermatopathology studies the microscopic features of skin diseases, aiding in diagnosis and understanding disease processes. It links clinical presentation with underlying cellular changes.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CLINICAL DERMATOLOGY"],
    "questions": [
      "How does dermatopathology assist in diagnosing skin disorders?",
      "What are common histopathological patterns seen in skin lesions?",
      "Why is a skin biopsy important in dermatology?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Types of Biopsy",
      "Histological Patterns",
      "Inflammatory vs Neoplastic Lesions",
      "Special Stains",
      "Diagnostic Challenges"
    ]
  },
  {
    "id": "morphology-investigations-skin-lesions",
    "title": "Morphology and Investigations of Skin Lesions",
    "description": "Morphology describes the visible features of skin lesions, guiding clinical diagnosis. Investigations such as microscopy, cultures, and imaging help confirm the underlying cause.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CLINICAL DERMATOLOGY"],
    "questions": [
      "What are the major morphological types of skin lesions?",
      "Which investigations are most useful for evaluating skin disorders?",
      "How does clinical morphology guide further testing?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Primary and Secondary Lesions",
      "Dermoscopy",
      "Skin Scraping and KOH Test",
      "Patch Testing",
      "Imaging in Dermatology"
    ]
  },
  {
    "id": "acne-rosacea-others",
    "title": "Acne, Rosacea and Others",
    "description": "Acne and rosacea are common disorders of the skin’s adnexa, presenting with pimples, redness, and inflammation. Understanding their causes enables effective treatment and prevention.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ADNEXA AND APPENDAGES"],
    "questions": [
      "What are the differences in the pathogenesis of acne and rosacea?",
      "How are acne and rosacea diagnosed and managed?",
      "What are some other adnexal disorders affecting the skin?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Sebaceous Glands",
      "Inflammatory Pathways",
      "Topical and Systemic Therapies",
      "Triggers and Aggravators",
      "Complications (e.g., Scarring)"
    ]
  },
  {
    "id": "disorders-hair-nails",
    "title": "Disorders of Hair and Nails",
    "description": "Hair and nail disorders encompass a range of conditions affecting growth, appearance, and integrity. Early recognition is important for diagnosis and tailored management.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HAIR AND NAILS"],
    "questions": [
      "What are common causes of hair loss?",
      "How are nail disorders classified and diagnosed?",
      "What systemic diseases can present with hair and nail changes?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Alopecia Types",
      "Nail Dystrophies",
      "Fungal Infections",
      "Genetic Disorders",
      "Diagnostic Clues"
    ]
  },
  {
    "id": "disorders-skin-pigmentation",
    "title": "Disorders of Skin Pigmentation",
    "description": "Disorders of skin pigmentation include conditions causing hypo- or hyperpigmentation, affecting appearance and sometimes indicating underlying disease. Early identification guides appropriate management.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN PIGMENTATION"],
    "questions": [
      "What are the common causes of hypo- and hyperpigmentation?",
      "How is vitiligo different from melasma?",
      "What investigations help determine the cause of pigmentation changes?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Melanin Biosynthesis",
      "Vitiligo",
      "Melasma",
      "Post-inflammatory Pigmentation",
      "Genetic and Acquired Causes"
    ]
  },
  {
    "id": "dermatitis",
    "title": "Dermatitis",
    "description": "Dermatitis refers to inflammation of the skin, resulting from a variety of causes including allergens, irritants, and genetic factors. It presents with redness, itching, and scaling.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ALLERGIC DISORDERS & DERMATITIS"],
    "questions": [
      "What are the types and causes of dermatitis?",
      "How is atopic dermatitis differentiated from contact dermatitis?",
      "What are the mainstays of dermatitis management?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Atopic Dermatitis",
      "Contact Dermatitis",
      "Irritant vs Allergic Types",
      "Skin Barrier Dysfunction",
      "Treatment Approaches"
    ]
  },
  {
    "id": "urticaria-angioedema",
    "title": "Urticaria & Angioedema",
    "description": "Urticaria (hives) and angioedema are hypersensitivity reactions characterized by swelling, redness, and intense itching. Triggers range from allergens to medications and environmental factors.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ALLERGIC DISORDERS & DERMATITIS"],
    "questions": [
      "What is the underlying mechanism of urticaria and angioedema?",
      "How are acute and chronic urticaria differentiated?",
      "What are the emergency management steps for severe angioedema?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Histamine Release",
      "Triggers",
      "Chronic Urticaria",
      "Drug-induced Reactions",
      "Emergency Treatment"
    ]
  },
  {
    "id": "reactive-skin-diseases-drug-eruptions",
    "title": "Reactive Skin Diseases and Drug Eruptions",
    "description": "Reactive skin diseases and drug eruptions are abnormal skin responses to medications or infections. They range from mild rashes to life-threatening conditions like Stevens-Johnson syndrome.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ALLERGIC DISORDERS & DERMATITIS"],
    "questions": [
      "What are the clinical features of common drug eruptions?",
      "How are reactive skin diseases identified and managed?",
      "Which medications are frequently associated with severe skin reactions?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Exanthematous Drug Rashes",
      "Stevens-Johnson Syndrome",
      "Toxic Epidermal Necrolysis",
      "Diagnosis and Monitoring",
      "Prevention Strategies"
    ]
  },
  {
    "id": "papulosquamous-disorders",
    "title": "Papulosquamous Disorders",
    "description": "Papulosquamous disorders are characterized by scaly papules and plaques, often chronic and relapsing. Psoriasis and lichen planus are common examples requiring long-term management.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["PAPULOSQUAMOUS DISORDERS"],
    "questions": [
      "What are the common features of papulosquamous disorders?",
      "How is psoriasis differentiated from lichen planus?",
      "What are the treatment options for chronic papulosquamous diseases?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Psoriasis",
      "Lichen Planus",
      "Pityriasis Rosea",
      "Chronic Inflammation",
      "Topical and Systemic Therapies"
    ]
  },
  {
    "id": "psoriasis",
    "title": "Psoriasis",
    "description": "Psoriasis is a chronic autoimmune skin disorder resulting in red, scaly plaques, often on extensor surfaces. Its management includes topical agents, phototherapy, and systemic medications.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["PAPULOSQUAMOUS DISORDERS"],
    "questions": [
      "What is the pathogenesis of psoriasis?",
      "Which clinical variants of psoriasis exist?",
      "How is moderate to severe psoriasis managed?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Plaque Psoriasis",
      "Guttate Psoriasis",
      "Psoriatic Arthritis",
      "Immunopathogenesis",
      "Biologics"
    ]
  },
  {
    "id": "vesiculobullous-diseases",
    "title": "Vesiculobullous Diseases",
    "description": "Vesiculobullous diseases are blistering disorders of the skin, including autoimmune and infectious etiologies. Accurate diagnosis is vital due to potential severity and risk of complications.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["VESICULOBULLOUS DISORDERS"],
    "questions": [
      "What are the major autoimmune vesiculobullous diseases?",
      "How are these diseases diagnosed histologically?",
      "What are the principles of management for severe blistering diseases?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Pemphigus Vulgaris",
      "Bullous Pemphigoid",
      "Herpetic Infections",
      "Immunofluorescence",
      "Wound Care"
    ]
  },
  {
    "id": "mycobacterial-infections",
    "title": "Mycobacterial Infections",
    "description": "Mycobacterial infections of the skin, including tuberculosis and leprosy, present with diverse skin lesions. Early recognition and treatment are crucial to prevent complications.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN INFECTIONS & INFESTATIONS"],
    "questions": [
      "What are the cutaneous manifestations of mycobacterial infections?",
      "How are skin tuberculosis and leprosy diagnosed?",
      "What are the mainstays of therapy for mycobacterial skin diseases?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cutaneous Tuberculosis",
      "Leprosy",
      "Diagnostic Techniques",
      "Antimycobacterial Therapy",
      "Prevention Strategies"
    ]
  },
  {
    "id": "bacterial-infections",
    "title": "Bacterial Infections",
    "description": "Bacterial infections of the skin range from superficial impetigo to deep cellulitis and abscesses. Prompt diagnosis and appropriate antimicrobial therapy are essential for recovery.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN INFECTIONS & INFESTATIONS"],
    "questions": [
      "What are common bacterial skin infections and their presentations?",
      "How are superficial versus deep bacterial infections managed?",
      "What factors predispose to recurrent bacterial skin infections?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Impetigo",
      "Cellulitis",
      "Abscesses",
      "Antibiotic Therapy",
      "Prevention and Hygiene"
    ]
  },
  {
    "id": "viral-infections",
    "title": "Viral Infections",
    "description": "Viral skin infections include a variety of conditions with distinctive lesions, from warts to herpes. Timely identification helps guide treatment and prevent transmission.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN INFECTIONS & INFESTATIONS"],
    "questions": [
      "What are the characteristic features of common viral skin infections?",
      "How are viral skin infections diagnosed and treated?",
      "What preventive measures limit the spread of viral skin diseases?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Warts (HPV)",
      "Herpes Simplex and Zoster",
      "Molluscum Contagiosum",
      "Antiviral Therapies",
      "Infection Control"
    ]
  },
  {
    "id": "fungal-protozoal-infections",
    "title": "Fungal and Protozoal Infections",
    "description": "Fungal and protozoal skin infections commonly present with rashes, scaling, or ulcers. Diagnosis relies on clinical features and laboratory tests, guiding targeted therapy.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN INFECTIONS & INFESTATIONS"],
    "questions": [
      "What are the common types of fungal skin infections?",
      "How are protozoal skin infections diagnosed?",
      "What are the key differences in management between fungal and protozoal infections?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Dermatophytosis",
      "Candidiasis",
      "Leishmaniasis",
      "Laboratory Diagnosis",
      "Antifungal and Antiprotozoal Agents"
    ]
  },
  {
    "id": "arthropod-parasitic-infections",
    "title": "Arthropod and Parasitic Infections",
    "description": "Arthropod and parasitic infections of the skin are transmitted by insects or direct contact, causing itching, rashes, or nodules. Prevention and early treatment are key.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN INFECTIONS & INFESTATIONS"],
    "questions": [
      "What are the clinical features of scabies and lice infestations?",
      "How are arthropod-borne skin diseases prevented and treated?",
      "What complications can arise from untreated parasitic skin infections?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Scabies",
      "Pediculosis",
      "Vector Control",
      "Topical Therapies",
      "Complications (e.g., Secondary Infection)"
    ]
  },
  {
    "id": "syphilis",
    "title": "Syphilis",
    "description": "Syphilis is a sexually transmitted infection caused by Treponema pallidum, presenting with varied skin manifestations at different stages. Early diagnosis and treatment prevent serious complications.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SEXUALLY TRANSMITTED INFECTIONS"],
    "questions": [
      "What are the stages of syphilis and their skin findings?",
      "How is syphilis diagnosed and treated?",
      "What are the public health implications of syphilis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Primary, Secondary, Tertiary Syphilis",
      "Serological Testing",
      "Penicillin Therapy",
      "Congenital Syphilis",
      "Prevention Strategies"
    ]
  },
  {
    "id": "non-syphilitic-stds",
    "title": "Non Syphilitic Sexually Transmitted Diseases",
    "description": "Non-syphilitic STDs like gonorrhea, chlamydia, and herpes present with diverse skin and mucosal lesions. Accurate identification and treatment are essential for individual and public health.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SEXUALLY TRANSMITTED INFECTIONS"],
    "questions": [
      "What are the common non-syphilitic STDs with skin manifestations?",
      "How are these diseases diagnosed and managed?",
      "What are the long-term complications of untreated STDs?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Gonorrhea",
      "Chlamydia",
      "Genital Herpes",
      "Screening and Prevention",
      "Partner Notification"
    ]
  },
  {
    "id": "genodermatoses-nutritional-disorders",
    "title": "Genodermatoses & Nutritional Disorders",
    "description": "Genodermatoses are inherited skin disorders, while nutritional deficiencies can lead to characteristic skin changes. Both require early recognition for effective management.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENODERMATOSES & NUTRITIONAL DISORDERS"],
    "questions": [
      "What are examples of genodermatoses and their clinical features?",
      "How do nutritional deficiencies present in the skin?",
      "What is the role of genetics in diagnosing skin disorders?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Inherited Skin Diseases",
      "Nutritional Dermatoses",
      "Vitamin Deficiencies",
      "Diagnostic Approaches",
      "Therapeutic Interventions"
    ]
  },
  {
    "id": "connective-tissue-disorders",
    "title": "Connective Tissue Disorders",
    "description": "Connective tissue disorders affect the skin, joints, and internal organs, often presenting with characteristic rashes. Early recognition is vital as they may indicate systemic disease.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CONNECTIVE TISSUE DISORDERS"],
    "questions": [
      "What are the cutaneous features of connective tissue disorders?",
      "How are lupus and scleroderma differentiated clinically?",
      "What investigations aid in diagnosing connective tissue diseases?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Systemic Lupus Erythematosus",
      "Scleroderma",
      "Dermatomyositis",
      "Autoantibody Testing",
      "Multisystem Involvement"
    ]
  },
  {
    "id": "skin-malignancies",
    "title": "Skin Malignancies",
    "description": "Skin malignancies include common cancers like basal cell carcinoma, squamous cell carcinoma, and melanoma. Early detection and treatment are crucial for favorable outcomes.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN MALIGNANCIES"],
    "questions": [
      "What are the clinical features of common skin cancers?",
      "How are skin malignancies diagnosed and managed?",
      "What risk factors contribute to the development of skin cancer?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Basal Cell Carcinoma",
      "Squamous Cell Carcinoma",
      "Melanoma",
      "Risk Factors",
      "Prevention and Screening"
    ]
  },
  {
    "id": "systemic-diseases-skin",
    "title": "Systemic Diseases and Skin",
    "description": "Many systemic diseases manifest in the skin, serving as diagnostic clues for internal disorders. Recognition of these signs can lead to early diagnosis and treatment.",
    "category": "Dermatology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN IN SYSTEMIC DISORDERS"],
    "questions": [
      "What are common skin manifestations of systemic diseases?",
      "How can skin findings aid in diagnosing internal disorders?",
      "What are examples of paraneoplastic skin syndromes?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cutaneous Markers of Disease",
      "Paraneoplastic Syndromes",
      "Endocrine Skin Changes",
      "Hematologic Disorders",
      "Multisystem Diseases"
    ]
  },
  {
    "id": "cellular-genetics-adaptations-injury",
    "title": "Cellular Genetics, Adaptations and Injury",
    "description": "Cellular genetics and adaptations describe how cells respond to stress, and the mechanisms underlying cellular injury. Understanding these processes is vital for grasping disease pathogenesis.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the main types of cellular adaptations?",
      "How do genetic mutations contribute to cellular injury?",
      "What triggers cellular adaptation versus cell injury?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Hypertrophy and Hyperplasia",
      "Atrophy and Metaplasia",
      "Cellular Stress Responses",
      "Molecular Pathways of Injury",
      "Genetic Mutations"
    ]
  },
  {
    "id": "cell-death",
    "title": "Cell Death",
    "description": "Cell death occurs through regulated mechanisms like apoptosis and uncontrolled processes like necrosis. Distinguishing these forms helps understand tissue responses in health and disease.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the differences between apoptosis and necrosis?",
      "What triggers programmed cell death?",
      "How is cell death detected histologically?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Apoptosis Pathways",
      "Necrosis Types",
      "Autophagy",
      "Cell Death Markers",
      "Clinical Implications"
    ]
  },
  {
    "id": "intracellular-accumulations-calcification-ageing",
    "title": "Intracellular Accumulations, Pathological Calcification and Cellular Ageing",
    "description": "Cells may accumulate abnormal substances, undergo pathological calcification, or show signs of ageing. These processes contribute to tissue dysfunction and disease.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What substances commonly accumulate in cells during disease?",
      "How does pathological calcification differ from physiological?",
      "What are the mechanisms of cellular ageing?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Lipofuscin and Fatty Change",
      "Dystrophic vs Metastatic Calcification",
      "Senescence",
      "Telomere Shortening",
      "Protein Aggregation"
    ]
  },
  {
    "id": "acute-inflammation",
    "title": "Acute Inflammation",
    "description": "Acute inflammation is an immediate response to injury or infection, characterized by redness, swelling, heat, and pain. It serves to eliminate harmful agents and initiate repair.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the main features of acute inflammation?",
      "Which cells and mediators are involved in the inflammatory response?",
      "How does inflammation resolve or progress to chronicity?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Vascular Changes",
      "Cellular Infiltrate",
      "Chemical Mediators",
      "Resolution and Healing",
      "Chronic Inflammation"
    ]
  },
  {
    "id": "inflammatory-mediators-granulomatous-inflammation",
    "title": "Inflammatory Mediators and Granulomatous Inflammation",
    "description": "Inflammatory mediators orchestrate complex immune responses. Granulomatous inflammation is a specialized form seen in certain infections and autoimmune diseases.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the key inflammatory mediators?",
      "How does granulomatous inflammation differ from acute inflammation?",
      "What diseases are commonly associated with granuloma formation?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cytokines and Chemokines",
      "Macrophage Activation",
      "Granuloma Structure",
      "Tuberculosis",
      "Sarcoidosis"
    ]
  },
  {
    "id": "tissue-repair",
    "title": "Tissue Repair",
    "description": "Tissue repair restores structure and function after injury via regeneration or scar formation. The balance between these processes determines healing outcomes.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What is the difference between regeneration and fibrosis?",
      "What factors influence tissue repair and healing?",
      "How do chronic wounds develop?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Wound Healing Stages",
      "Growth Factors",
      "Extracellular Matrix",
      "Fibrosis",
      "Chronic Ulcers"
    ]
  },
  {
    "id": "disorders-hemodynamics-hemostasis",
    "title": "Disorders of Hemodynamics and Hemostasis",
    "description": "Disorders of hemodynamics and hemostasis affect blood flow and clotting, leading to conditions like edema, thrombosis, and hemorrhage. These processes are central to many diseases.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the causes and consequences of edema?",
      "How does abnormal hemostasis lead to bleeding or thrombosis?",
      "What are the clinical implications of shock?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Edema Types",
      "Thrombosis Pathways",
      "Hemorrhage",
      "Shock Mechanisms",
      "Clotting Cascade"
    ]
  },
  {
    "id": "modes-of-inheritance",
    "title": "Modes of Inheritance",
    "description": "Modes of inheritance describe how genetic traits and disorders are transmitted across generations. Understanding these patterns helps predict disease risk in families.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the main modes of genetic inheritance?",
      "How do autosomal dominant and recessive disorders differ?",
      "What is the significance of X-linked inheritance?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Mendelian Genetics",
      "Pedigree Analysis",
      "Autosomal vs X-linked",
      "Mitochondrial Inheritance",
      "Genetic Counseling"
    ]
  },
  {
    "id": "lysosomal-glycogen-storage-diseases",
    "title": "Lysosomal and Glycogen Storage Diseases",
    "description": "Lysosomal and glycogen storage diseases are inherited metabolic disorders resulting from enzyme deficiencies. They lead to accumulation of substances within cells and multi-organ involvement.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are common examples of lysosomal and glycogen storage diseases?",
      "How do enzyme deficiencies cause cellular dysfunction?",
      "What are the clinical features of these disorders?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Gaucher Disease",
      "Pompe Disease",
      "Enzyme Replacement Therapy",
      "Pathologic Storage",
      "Genetic Testing"
    ]
  },
  {
    "id": "chromosomal-other-genetic-disorders",
    "title": "Chromosomal Disorders and Other Genetic Disorders",
    "description": "Chromosomal and other genetic disorders involve structural or numerical abnormalities in chromosomes, leading to a wide range of clinical syndromes and developmental issues.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are examples of chromosomal disorders?",
      "How are chromosomal abnormalities detected?",
      "What is the impact of genetic mutations on phenotype?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Down Syndrome",
      "Turner Syndrome",
      "Karyotyping",
      "Genetic Counseling",
      "Gene Mutations"
    ]
  },
  {
    "id": "neoplasms-characteristics-epidemiology",
    "title": "Characteristics of Neoplasms and Epidemiology",
    "description": "Neoplasms are abnormal growths that can be benign or malignant. Understanding their characteristics and epidemiology is key to cancer prevention and management.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "How are neoplasms classified as benign or malignant?",
      "What are the hallmarks of cancer?",
      "What epidemiological factors influence cancer incidence?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Tumor Grading and Staging",
      "Benign vs Malignant",
      "Cancer Risk Factors",
      "Tumor Markers",
      "Population Trends"
    ]
  },
  {
    "id": "molecular-basis-cancer-tumor-immunity",
    "title": "Molecular Basis of Cancer and Tumor Immunity",
    "description": "Cancer develops through a series of genetic and molecular changes, while the immune system plays a role in tumor surveillance and response. Understanding these mechanisms is vital for targeted therapies.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are key genetic mutations in cancer development?",
      "How does the immune system recognize and attack tumors?",
      "What is the role of oncogenes and tumor suppressor genes?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Oncogenes",
      "Tumor Suppressors",
      "Immune Surveillance",
      "Checkpoint Inhibitors",
      "Immunotherapy"
    ]
  },
  {
    "id": "carcinogenesis-paraneoplastic-tumor-markers",
    "title": "Carcinogenesis, Paraneoplastic Syndromes and Tumor Markers",
    "description": "Carcinogenesis involves the multi-step transformation of normal cells to cancer. Paraneoplastic syndromes are systemic effects of cancer, and tumor markers aid in diagnosis and monitoring.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the stages of carcinogenesis?",
      "How do paraneoplastic syndromes present clinically?",
      "What are commonly used tumor markers in oncology?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Initiation, Promotion, Progression",
      "Paraneoplastic Effects",
      "Tumor Marker Tests",
      "Risk Factors",
      "Screening Programs"
    ]
  },
  {
    "id": "components-immune-system",
    "title": "Components of Immune System",
    "description": "The immune system consists of cells and molecules that defend the body against pathogens. Understanding its components is essential for grasping immunity and immunopathology.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the main cellular and humoral components of the immune system?",
      "How do innate and adaptive immunity differ?",
      "What are primary versus secondary lymphoid organs?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Lymphocytes",
      "Antibodies",
      "Cytokines",
      "Immune Organs",
      "Immune Response"
    ]
  },
  {
    "id": "hypersensitivity-autoimmunity",
    "title": "Hypersensitivity and Autoimmunity",
    "description": "Hypersensitivity reactions are exaggerated immune responses, while autoimmunity involves the immune system attacking self-tissues. Both play roles in a variety of diseases.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the types of hypersensitivity reactions?",
      "How does autoimmunity develop?",
      "Which diseases are associated with autoimmunity?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Type I-IV Hypersensitivity",
      "Autoimmune Disorders",
      "Immune Tolerance",
      "Genetic Susceptibility",
      "Diagnostic Tests"
    ]
  },
  {
    "id": "immunodeficiency-syndromes",
    "title": "Immunodeficiency Syndromes",
    "description": "Immunodeficiency syndromes result from defects in immune components, leading to increased susceptibility to infections. They may be inherited or acquired.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the differences between primary and secondary immunodeficiencies?",
      "How are immunodeficiency syndromes diagnosed?",
      "What are common clinical presentations of immunodeficiency?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Primary Immunodeficiencies",
      "Acquired Immunodeficiencies",
      "HIV/AIDS",
      "Recurrent Infections",
      "Treatment Approaches"
    ]
  },
  {
    "id": "amyloidosis-graft-rejection",
    "title": "Amyloidosis and Graft Rejection",
    "description": "Amyloidosis is characterized by abnormal protein deposition in tissues, while graft rejection is the immune-mediated destruction of transplanted organs. Both have significant clinical consequences.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENERAL PATHOLOGY"],
    "questions": [
      "What are the types and causes of amyloidosis?",
      "How does the immune system mediate graft rejection?",
      "What strategies prevent or treat graft rejection?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "AL and AA Amyloidosis",
      "Protein Misfolding",
      "Transplant Immunology",
      "Rejection Types",
      "Immunosuppressive Therapy"
    ]
  },

  {
    "id": "microcytic-anemia",
    "title": "Microcytic Anemia",
    "description": "Microcytic anemia is characterized by small, pale red blood cells, commonly due to iron deficiency or chronic disease. Identifying the cause is crucial for effective treatment.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the main causes of microcytic anemia?",
      "How is microcytic anemia diagnosed in the laboratory?",
      "What are the treatment options for iron deficiency anemia?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Iron Deficiency",
      "Thalassemia",
      "Anemia of Chronic Disease",
      "Laboratory Diagnosis",
      "Therapeutic Interventions"
    ]
  },
  {
    "id": "normocytic-macrocytic-anemia",
    "title": "Normocytic And Macrocytic Anemia",
    "description": "Normocytic and macrocytic anemias are classified by red cell size and can result from diverse causes including chronic disease, vitamin deficiencies, or bone marrow disorders.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "How do normocytic and macrocytic anemias differ in etiology and presentation?",
      "What laboratory findings help distinguish these anemias?",
      "What are the common causes of macrocytosis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Vitamin B12 Deficiency",
      "Folate Deficiency",
      "Aplastic Anemia",
      "Reticulocyte Count",
      "Bone Marrow Evaluation"
    ]
  },
  {
    "id": "basics-hemolysis-intravascular-hemolysis",
    "title": "Basics of Hemolysis and Intravascular Hemolysis",
    "description": "Hemolysis is the destruction of red blood cells, which can occur within blood vessels (intravascular) or outside them. Understanding these mechanisms helps diagnose hemolytic disorders.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What differentiates intravascular from extravascular hemolysis?",
      "What are the clinical signs of hemolytic anemia?",
      "How is hemolysis detected in laboratory tests?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Hemolytic Anemia",
      "Laboratory Markers",
      "Hemoglobinuria",
      "Causes of Hemolysis",
      "Management Strategies"
    ]
  },
  {
    "id": "extravascular-hemolysis",
    "title": "Extravascular Hemolysis",
    "description": "Extravascular hemolysis occurs when red blood cells are destroyed by the spleen or liver. It often presents with jaundice and splenomegaly.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the mechanisms leading to extravascular hemolysis?",
      "Which diseases commonly cause extravascular hemolysis?",
      "How is extravascular hemolysis managed clinically?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Spherocytosis",
      "Autoimmune Hemolytic Anemia",
      "Splenic Function",
      "Jaundice",
      "Reticuloendothelial System"
    ]
  },
  {
    "id": "g6pd-autoimmune-hemolytic-anemias",
    "title": "G6PD deficiency and Autoimmune Hemolytic Anemias",
    "description": "G6PD deficiency and autoimmune hemolytic anemias are distinct causes of red cell destruction. Both require specific diagnostic and therapeutic strategies.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "How does G6PD deficiency lead to hemolysis?",
      "What are the types of autoimmune hemolytic anemia?",
      "How are these conditions diagnosed and treated?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Enzyme Deficiencies",
      "Oxidative Stress",
      "Direct Antiglobulin Test",
      "Warm and Cold AIHA",
      "Triggers and Management"
    ]
  },
  {
    "id": "platelet-disorders",
    "title": "Platelet Disorders",
    "description": "Platelet disorders result in abnormal bleeding or clotting, ranging from thrombocytopenia to functional defects. Accurate diagnosis is crucial for proper management.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the main types of platelet disorders?",
      "How are inherited and acquired platelet disorders differentiated?",
      "What laboratory tests assess platelet function?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Thrombocytopenia",
      "Platelet Function Tests",
      "ITP and TTP",
      "Inherited Platelet Disorders",
      "Treatment Approaches"
    ]
  },
  {
    "id": "coagulation-pathway-disorders",
    "title": "Coagulation Pathway Disorders",
    "description": "Disorders of the coagulation pathway lead to bleeding or thrombotic complications. They can be inherited, such as hemophilia, or acquired due to liver disease or medications.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the common inherited coagulation disorders?",
      "How is the coagulation pathway assessed in the lab?",
      "What are the clinical features of hemophilia?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Hemophilia A and B",
      "Vitamin K Deficiency",
      "Coagulation Tests (PT, aPTT)",
      "DIC",
      "Factor Deficiencies"
    ]
  },
  {
    "id": "blood-products-transfusion-reactions",
    "title": "Blood Products and Transfusion Reactions",
    "description": "Blood products are used to treat anemia and bleeding disorders but can cause transfusion reactions. Understanding indications and monitoring is essential for safe transfusion practice.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the types of blood products used in transfusion?",
      "What are common transfusion reactions and how are they managed?",
      "What precautions ensure transfusion safety?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Packed Red Cells",
      "Plasma and Platelets",
      "Acute and Delayed Reactions",
      "Hemovigilance",
      "Crossmatching"
    ]
  },
  {
    "id": "acute-lymphocytic-leukemia",
    "title": "Acute Lymphocytic Leukemia (ALL)",
    "description": "Acute lymphocytic leukemia (ALL) is a malignancy of lymphoid progenitor cells, common in children. Early diagnosis and targeted therapy have improved prognosis.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the clinical features and risk factors for ALL?",
      "How is ALL diagnosed and classified?",
      "What are the main treatment strategies for ALL?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Lymphoid Progenitors",
      "Bone Marrow Examination",
      "Genetic Abnormalities",
      "Chemotherapy Protocols",
      "Prognosis"
    ]
  },
  {
    "id": "acute-myeloid-leukemia",
    "title": "Acute Myeloid Leukemia (AML)",
    "description": "Acute myeloid leukemia (AML) is a cancer of myeloid cells, presenting with rapid marrow failure. It requires prompt diagnosis and aggressive treatment.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the subtypes and cytogenetic markers of AML?",
      "How does AML typically present clinically?",
      "What advances have improved AML treatment outcomes?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Myeloid Cell Differentiation",
      "FAB Classification",
      "Cytogenetics",
      "Induction Therapy",
      "Stem Cell Transplant"
    ]
  },
  {
    "id": "hodgkins-lymphoma",
    "title": "Hodgkin's Lymphoma",
    "description": "Hodgkin's lymphoma is a lymphoid malignancy characterized by Reed-Sternberg cells. It often presents with painless lymphadenopathy and is highly curable with modern therapies.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the histological subtypes of Hodgkin's lymphoma?",
      "How is Hodgkin's lymphoma staged and treated?",
      "What are the long-term outcomes for patients with Hodgkin's lymphoma?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Reed-Sternberg Cells",
      "Staging Systems",
      "Chemotherapy and Radiotherapy",
      "Prognostic Factors",
      "Late Effects"
    ]
  },
  {
    "id": "non-hodgkin-lymphomas-general",
    "title": "Non Hodgkin Lymphomas: General Considerations",
    "description": "Non-Hodgkin lymphomas (NHL) are a diverse group of lymphoid cancers. Their classification, clinical course, and management vary widely.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "How are non-Hodgkin lymphomas classified?",
      "What are the general clinical features of NHL?",
      "What factors influence prognosis in NHL?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "B-cell and T-cell Lymphomas",
      "WHO Classification",
      "Lymphadenopathy",
      "Prognostic Indices",
      "Treatment Modalities"
    ]
  },
  {
    "id": "non-hodgkin-lymphomas-low-grade",
    "title": "Non Hodgkin Lymphomas: Low Grade",
    "description": "Low-grade non-Hodgkin lymphomas are indolent malignancies with slow progression. They often require long-term monitoring and can transform into aggressive forms.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are common types of low-grade NHL?",
      "How are low-grade lymphomas diagnosed and managed?",
      "What is the risk of transformation to high-grade disease?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Follicular Lymphoma",
      "Small Lymphocytic Lymphoma",
      "Indolent Course",
      "Molecular Markers",
      "Transformation Risk"
    ]
  },
  {
    "id": "non-hodgkin-lymphomas-high-grade",
    "title": "Non Hodgkin Lymphomas: High Grade",
    "description": "High-grade non-Hodgkin lymphomas are aggressive cancers that require rapid diagnosis and intensive treatment. Prognosis depends on subtype and response to therapy.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "Which lymphomas are considered high-grade NHL?",
      "What are the clinical features and presentation of high-grade lymphomas?",
      "How are these lymphomas treated?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Diffuse Large B-cell Lymphoma",
      "Burkitt Lymphoma",
      "Aggressive Clinical Course",
      "Chemotherapy Regimens",
      "Prognostic Factors"
    ]
  },
  {
    "id": "multiple-myeloma-plasma-cell-disorders",
    "title": "Multiple Myeloma and Plasma Cell Disorders",
    "description": "Multiple myeloma and plasma cell disorders are characterized by abnormal proliferation of plasma cells. They lead to bone lesions, kidney dysfunction, and immunodeficiency.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the diagnostic criteria for multiple myeloma?",
      "How do plasma cell disorders affect organ systems?",
      "What are the treatment options for multiple myeloma?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Monoclonal Gammopathy",
      "CRAB Features",
      "Bone Marrow Involvement",
      "Immunoglobulin Abnormalities",
      "Novel Therapies"
    ]
  },
  {
    "id": "myelodysplastic-myeloproliferative-histiocytosis",
    "title": "Myelodysplastic Syndrome, Myeloproliferative Syndromes and Histiocytosis",
    "description": "Myelodysplastic syndromes, myeloproliferative syndromes, and histiocytoses are bone marrow disorders with abnormal blood cell production. They may progress to leukemia.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the features of myelodysplastic and myeloproliferative syndromes?",
      "How is histiocytosis diagnosed?",
      "What is the risk of transformation to acute leukemia?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cytopenias",
      "Clonal Proliferation",
      "Bone Marrow Biopsy",
      "Leukemic Transformation",
      "Treatment Strategies"
    ]
  },
  {
    "id": "leukopenia-leukocytosis-lymphadenitis",
    "title": "Leukopenia, Leukocytosis and Lymphadenitis",
    "description": "Leukopenia and leukocytosis refer to abnormal white blood cell counts, while lymphadenitis is inflammation of lymph nodes. All are important indicators of underlying disease.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["HEMATOLOGY"],
    "questions": [
      "What are the causes of leukopenia and leukocytosis?",
      "How is lymphadenitis identified clinically and histologically?",
      "What are the implications of persistent white cell abnormalities?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Infections and Inflammation",
      "Bone Marrow Suppression",
      "Reactive vs Neoplastic",
      "Lymph Node Biopsy",
      "Clinical Evaluation"
    ]
  },
  {
    "id": "hypertensive-vascular-disease-atherosclerosis",
    "title": "Hypertensive Vascular Disease and Atherosclerosis",
    "description": "Hypertensive vascular disease and atherosclerosis are major contributors to cardiovascular morbidity. They cause vessel wall changes that lead to heart attacks and strokes.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARDIOVASCULAR SYSTEM"],
    "questions": [
      "What are the pathological features of hypertensive vascular disease?",
      "How does atherosclerosis develop and progress?",
      "What risk factors contribute to these conditions?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Arteriosclerosis Types",
      "Plaque Formation",
      "Complications (MI, Stroke)",
      "Modifiable Risk Factors",
      "Prevention"
    ]
  },
  {
    "id": "aneurysm-dissection",
    "title": "Aneurysm and Dissection",
    "description": "Aneurysms are abnormal dilatations of blood vessels, while dissections involve splitting of vessel layers. Both conditions can be life-threatening if ruptured.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARDIOVASCULAR SYSTEM"],
    "questions": [
      "What are the types and causes of aneurysms?",
      "How is aortic dissection diagnosed and managed?",
      "What are the risk factors for aneurysm formation?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "True vs False Aneurysm",
      "Aortic Dissection",
      "Clinical Presentation",
      "Imaging Modalities",
      "Surgical Interventions"
    ]
  },
  {
    "id": "vasculitis",
    "title": "Vasculitis",
    "description": "Vasculitis is inflammation of blood vessels, which can affect any organ. It may be primary or secondary and presents with diverse clinical manifestations.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARDIOVASCULAR SYSTEM"],
    "questions": [
      "What are the main types of vasculitis?",
      "How is vasculitis diagnosed?",
      "What are the systemic complications of vasculitis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Small, Medium, Large Vessel Vasculitis",
      "Autoimmune Mechanisms",
      "ANCA-associated Vasculitis",
      "Biopsy Findings",
      "Therapeutic Options"
    ]
  },
  {
    "id": "vascular-tumors",
    "title": "Vascular Tumors",
    "description": "Vascular tumors include benign and malignant neoplasms arising from blood vessels. Early recognition is important for management and prognosis.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARDIOVASCULAR SYSTEM"],
    "questions": [
      "What are common benign and malignant vascular tumors?",
      "How are vascular tumors diagnosed histologically?",
      "What are the treatment options for these tumors?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Hemangioma",
      "Angiosarcoma",
      "Immunohistochemistry",
      "Tumor Markers",
      "Surgical Approaches"
    ]
  },
  {
    "id": "heart-failure-ischemic-disease",
    "title": "Heart Failure and Ischemic Disease",
    "description": "Heart failure and ischemic heart disease are leading causes of morbidity and mortality. They result from impaired myocardial function and reduced blood supply to the heart.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARDIOVASCULAR SYSTEM"],
    "questions": [
      "What are the pathological changes in heart failure?",
      "How does ischemic heart disease develop?",
      "What are the acute and chronic complications of myocardial infarction?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Congestive Heart Failure",
      "Coronary Artery Disease",
      "Myocardial Infarction",
      "Remodeling",
      "Complications"
    ]
  },
  {
    "id": "myocardial-pericardial-diseases-cardiac-tumors",
    "title": "Myocardial and Pericardial Diseases and Cardiac Tumors",
    "description": "Myocardial and pericardial diseases include inflammatory, infectious, and neoplastic conditions. Cardiac tumors, though rare, can have significant clinical effects.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARDIOVASCULAR SYSTEM"],
    "questions": [
      "What are common myocardial and pericardial diseases?",
      "How are cardiac tumors classified and diagnosed?",
      "What are the management strategies for pericardial disease?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Myocarditis",
      "Pericarditis",
      "Primary vs Secondary Tumors",
      "Imaging Studies",
      "Surgical and Medical Management"
    ]
  },
  {
    "id": "congenital-valvular-heart-disease",
    "title": "Congenital and Valvular Heart Disease",
    "description": "Congenital and valvular heart diseases encompass structural abnormalities present at birth or acquired. They impact cardiac function and patient outcomes.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARDIOVASCULAR SYSTEM"],
    "questions": [
      "What are common congenital heart defects?",
      "How do valvular diseases affect cardiac physiology?",
      "What are the diagnostic methods for these conditions?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "ASD and VSD",
      "Valve Stenosis and Regurgitation",
      "Echocardiography",
      "Genetic Syndromes",
      "Surgical Correction"
    ]
  },
  {
    "id": "rheumatic-fever-endocarditis",
    "title": "Rheumatic Fever and Endocarditis",
    "description": "Rheumatic fever and endocarditis are inflammatory conditions affecting heart valves, often following infection. Prompt diagnosis prevents severe cardiac complications.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["CARDIOVASCULAR SYSTEM"],
    "questions": [
      "How does rheumatic fever develop after streptococcal infection?",
      "What are the pathological features of infective endocarditis?",
      "How are these conditions diagnosed and managed?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Aschoff Bodies",
      "Valve Vegetations",
      "Duke Criteria",
      "Antibiotic Therapy",
      "Prevention"
    ]
  },

  {
    "id": "glomerular-diseases",
    "title": "Glomerular Diseases",
    "description": "Glomerular diseases affect the filtering units of the kidney, resulting in proteinuria, hematuria, and renal dysfunction. They may be primary or secondary to systemic illnesses.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENITOURINARY SYSTEM"],
    "questions": [
      "What are the main types of glomerular diseases?",
      "How are glomerular diseases diagnosed?",
      "What are the clinical features and complications?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Nephrotic vs Nephritic Syndrome",
      "Immune Complex Deposition",
      "Biopsy Evaluation",
      "Pathogenesis",
      "Chronic Kidney Disease"
    ]
  },
  {
    "id": "tubulointerstitial-vascular-cystic-diseases",
    "title": "Tubulointerstitial, Vascular and Cystic Diseases",
    "description": "Tubulointerstitial, vascular, and cystic diseases involve non-glomerular components of the kidney. They present with varied symptoms and may progress to renal failure.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENITOURINARY SYSTEM"],
    "questions": [
      "What are the causes of tubulointerstitial nephritis?",
      "How do vascular diseases affect the kidneys?",
      "What are common cystic diseases of the kidney?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Acute and Chronic Interstitial Nephritis",
      "Renal Artery Stenosis",
      "Polycystic Kidney Disease",
      "Tubular Dysfunction",
      "Renal Failure"
    ]
  },
  {
    "id": "renal-tumors",
    "title": "Renal Tumors",
    "description": "Renal tumors range from benign masses to aggressive cancers like renal cell carcinoma. Early detection and classification guide treatment and prognosis.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENITOURINARY SYSTEM"],
    "questions": [
      "What are common types of renal tumors?",
      "How are renal tumors diagnosed and staged?",
      "What are the treatment options for renal cell carcinoma?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Renal Cell Carcinoma",
      "Wilms Tumor",
      "Benign Renal Tumors",
      "Imaging Studies",
      "Surgical Management"
    ]
  },
  {
    "id": "lower-urinary-tract",
    "title": "Lower Urinary Tract",
    "description": "The lower urinary tract includes the bladder and urethra, commonly affected by infections, stones, and malignancies. Symptoms often include hematuria and dysuria.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENITOURINARY SYSTEM"],
    "questions": [
      "What are common diseases of the lower urinary tract?",
      "How are bladder tumors diagnosed?",
      "What are the complications of chronic lower tract disease?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Urinary Tract Infections",
      "Bladder Cancer",
      "Urolithiasis",
      "Obstruction",
      "Diagnostic Procedures"
    ]
  },
  {
    "id": "female-genital-tract",
    "title": "Female Genital Tract",
    "description": "Pathology of the female genital tract includes infections, neoplasms, and hormonal disorders. Early detection improves outcomes in conditions like cervical and ovarian cancer.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENITOURINARY SYSTEM"],
    "questions": [
      "What are the common diseases affecting the female genital tract?",
      "How are cervical and ovarian cancers screened and diagnosed?",
      "What are the risk factors for gynecological malignancies?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cervical Intraepithelial Neoplasia",
      "Endometrial Hyperplasia",
      "Ovarian Tumors",
      "Pap Smear",
      "Hormonal Imbalance"
    ]
  },
  {
    "id": "male-genital-tract",
    "title": "Male Genital Tract",
    "description": "The male genital tract is affected by infections, tumors, and benign prostatic conditions. Understanding these aids in diagnosis and management of male reproductive health issues.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GENITOURINARY SYSTEM"],
    "questions": [
      "What are the common pathological conditions of the male genital tract?",
      "How is prostatic hyperplasia differentiated from prostate cancer?",
      "What are the diagnostic modalities for testicular tumors?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Prostatic Hyperplasia",
      "Prostate Cancer",
      "Testicular Tumors",
      "Infections",
      "Screening"
    ]
  },

  {
    "id": "alcoholic-infectious-liver-disease",
    "title": "Alcoholic and Infectious Liver Disease",
    "description": "Alcoholic and infectious liver diseases are major causes of liver dysfunction. They can lead to cirrhosis, liver failure, and hepatocellular carcinoma.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "How does alcohol damage the liver?",
      "What are the types of infectious hepatitis?",
      "How are complications of liver disease managed?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Alcoholic Hepatitis",
      "Viral Hepatitis (A-E)",
      "Cirrhosis",
      "Liver Failure",
      "Liver Cancer Risk"
    ]
  },
  {
    "id": "autoimmune-metabolic-liver-disease",
    "title": "Autoimmune and Metabolic Liver Disease",
    "description": "Autoimmune and metabolic liver diseases involve immune-mediated injury or metabolic defects. Early recognition can prevent progression to cirrhosis or liver failure.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "What are common autoimmune liver diseases?",
      "How do metabolic defects cause liver injury?",
      "What diagnostic tools are used for these conditions?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Autoimmune Hepatitis",
      "Primary Biliary Cholangitis",
      "Hemochromatosis",
      "Wilson Disease",
      "Genetic Testing"
    ]
  },
  {
    "id": "neoplasms-liver-biliary",
    "title": "Neoplasms of Liver and Biliary tract",
    "description": "Neoplasms of the liver and biliary tract include benign and malignant tumors. Early diagnosis is essential for effective treatment and improved survival.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "What are the types of liver and biliary tract tumors?",
      "How are these neoplasms diagnosed?",
      "What are the risk factors for hepatocellular carcinoma?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Hepatocellular Carcinoma",
      "Cholangiocarcinoma",
      "Benign Tumors",
      "Imaging Studies",
      "Surgical Approaches"
    ]
  },
  {
    "id": "gall-bladder-pancreas",
    "title": "Gall Bladder and Pancreas",
    "description": "Diseases of the gall bladder and pancreas range from inflammation to cancer. Gallstones and pancreatitis are common causes of morbidity.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "What are common diseases of the gall bladder?",
      "How does pancreatitis develop and present?",
      "What are the malignancies affecting these organs?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cholelithiasis",
      "Cholecystitis",
      "Acute and Chronic Pancreatitis",
      "Pancreatic Cancer",
      "Diagnostic Imaging"
    ]
  },
  {
    "id": "esophagus",
    "title": "Esophagus",
    "description": "Pathology of the esophagus includes inflammation, motility disorders, and tumors. Early diagnosis is key to managing complications like strictures and carcinoma.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "What are common esophageal diseases?",
      "How is esophageal cancer diagnosed?",
      "What are the risk factors for Barrett's esophagus?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Esophagitis",
      "Barrett's Esophagus",
      "Esophageal Cancer",
      "Motility Disorders",
      "Endoscopic Evaluation"
    ]
  },
  {
    "id": "stomach",
    "title": "Stomach",
    "description": "Stomach pathology covers inflammatory, ulcerative, and neoplastic diseases. Helicobacter pylori infection plays a major role in gastritis and ulcer formation.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "What are the main types of gastritis?",
      "How does H. pylori contribute to gastric disease?",
      "What are the features of gastric cancer?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Acute and Chronic Gastritis",
      "Peptic Ulcer Disease",
      "Helicobacter pylori",
      "Gastric Adenocarcinoma",
      "MALT Lymphoma"
    ]
  },
  {
    "id": "small-intestine",
    "title": "Small Intestine",
    "description": "Small intestine diseases include malabsorption, infections, and tumors. Celiac disease is a major cause of chronic malabsorption.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "What are the features of celiac disease?",
      "How are small bowel tumors diagnosed?",
      "What are causes of intestinal obstruction?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Malabsorption Syndromes",
      "Celiac Disease",
      "Small Intestine Tumors",
      "Infectious Enteritis",
      "Obstruction"
    ]
  },
  {
    "id": "large-intestine-non-neoplastic",
    "title": "Large Intestine - Non-Neoplastic Conditions",
    "description": "Non-neoplastic conditions of the large intestine include inflammatory and functional disorders. Common examples are ulcerative colitis and irritable bowel syndrome.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "What are the features of ulcerative colitis?",
      "How is irritable bowel syndrome diagnosed?",
      "What complications can arise from chronic colitis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Ulcerative Colitis",
      "Crohn's Disease",
      "IBS",
      "Colonic Polyps",
      "Toxic Megacolon"
    ]
  },
  {
    "id": "large-intestine-neoplastic",
    "title": "Large Intestine - Neoplastic Conditions",
    "description": "Neoplastic conditions of the large intestine include benign polyps and malignant tumors like colorectal cancer. Early detection is key to improving survival rates.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["GASTROINTESTINAL SYSTEM"],
    "questions": [
      "What are the types of colonic polyps?",
      "How is colorectal cancer screened and diagnosed?",
      "What are the risk factors for colonic neoplasia?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Adenomatous Polyps",
      "Colorectal Cancer",
      "Screening Guidelines",
      "Genetic Syndromes",
      "Prognostic Factors"
    ]
  },

  {
    "id": "congenital-ards-infections-lung",
    "title": "Congenital anomalies, ARDS, Infections",
    "description": "The respiratory system can be affected by congenital anomalies, acute respiratory distress syndrome (ARDS), and infections. These conditions range from mild to life-threatening.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["RESPIRATORY SYSTEM"],
    "questions": [
      "What are common congenital anomalies of the lung?",
      "How does ARDS develop and present?",
      "What are the major infectious agents affecting the lungs?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Congenital Lung Disease",
      "ARDS Pathogenesis",
      "Pneumonia",
      "Tuberculosis",
      "Respiratory Failure"
    ]
  },
  {
    "id": "obstructive-restrictive-lung-diseases",
    "title": "Obstructive and Restrictive lung diseases",
    "description": "Obstructive and restrictive lung diseases impair breathing through different mechanisms. Examples include asthma, COPD, pulmonary fibrosis, and sarcoidosis.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["RESPIRATORY SYSTEM"],
    "questions": [
      "What distinguishes obstructive from restrictive lung disease?",
      "How are these diseases diagnosed?",
      "What are the pathological changes in COPD and pulmonary fibrosis?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Asthma",
      "COPD",
      "Pulmonary Fibrosis",
      "Spirometry",
      "Pathophysiology"
    ]
  },
  {
    "id": "lung-tumors",
    "title": "Lung tumors",
    "description": "Lung tumors include benign and malignant neoplasms, with lung cancer being a leading cause of cancer death worldwide. Early detection and classification are crucial for management.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["RESPIRATORY SYSTEM"],
    "questions": [
      "What are the main types of lung cancer?",
      "How are lung tumors diagnosed and staged?",
      "What are the risk factors and symptoms of lung cancer?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Small Cell vs Non-Small Cell Cancer",
      "Benign Lung Tumors",
      "Imaging Studies",
      "Biopsy and Cytology",
      "Targeted Therapy"
    ]
  },

  {
    "id": "pituitary-parathyroids-pancreas",
    "title": "Pituitary, Parathyroids and Pancreas",
    "description": "The pituitary, parathyroid glands, and pancreas regulate vital hormonal functions. Disorders include tumors, hyper- or hypofunction, and autoimmune diseases.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENDOCRINE SYSTEM AND BREAST"],
    "questions": [
      "What are the common diseases of the pituitary and parathyroids?",
      "How does pancreatic endocrine pathology present?",
      "What are the diagnostic markers for these disorders?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Pituitary Adenomas",
      "Hyperparathyroidism",
      "Diabetes Mellitus",
      "Hormone Assays",
      "Endocrine Tumors"
    ]
  },
  {
    "id": "thyroid-glands",
    "title": "Thyroid Glands",
    "description": "Thyroid gland pathology includes hyperthyroidism, hypothyroidism, nodules, and cancer. Diagnosis relies on clinical, biochemical, and imaging assessments.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENDOCRINE SYSTEM AND BREAST"],
    "questions": [
      "What are the features of thyroid hyper- and hypothyroidism?",
      "How are thyroid nodules evaluated?",
      "What are the types of thyroid cancer?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Graves' Disease",
      "Hashimoto's Thyroiditis",
      "Thyroid Nodules",
      "Papillary and Follicular Carcinomas",
      "Diagnostic Imaging"
    ]
  },
  {
    "id": "the-adrenals",
    "title": "The Adrenals",
    "description": "The adrenal glands produce hormones critical for stress response, metabolism, and salt balance. Disorders include Cushing syndrome, Addison disease, and adrenal tumors.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENDOCRINE SYSTEM AND BREAST"],
    "questions": [
      "What are the main functions of the adrenal cortex and medulla?",
      "How do adrenal disorders present clinically?",
      "What are the common adrenal tumors?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Cushing Syndrome",
      "Addison Disease",
      "Pheochromocytoma",
      "Hormonal Testing",
      "Adrenal Imaging"
    ]
  },
  {
    "id": "the-breast",
    "title": "The Breast",
    "description": "Breast pathology includes benign and malignant lesions, with breast cancer being a leading cancer in women. Early screening and diagnosis are vital for better outcomes.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["ENDOCRINE SYSTEM AND BREAST"],
    "questions": [
      "What are common benign and malignant breast lesions?",
      "How is breast cancer screened and diagnosed?",
      "What are the risk factors for breast cancer?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Fibroadenoma",
      "Ductal Carcinoma in Situ (DCIS)",
      "Invasive Carcinoma",
      "Breast Screening",
      "Hormonal Influence"
    ]
  },

  {
    "id": "developmental-infections-tumors-bone",
    "title": "Developmental disorders, infections and tumors of bone",
    "description": "The bones are affected by developmental disorders, infections like osteomyelitis, and tumors. Early recognition aids in effective treatment and prevention of complications.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN AND MUSCULOSKELETAL SYSTEM"],
    "questions": [
      "What are common developmental bone disorders?",
      "How are bone infections diagnosed and managed?",
      "What are the types of bone tumors?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Osteogenesis Imperfecta",
      "Osteomyelitis",
      "Osteosarcoma",
      "Benign Bone Tumors",
      "Imaging Studies"
    ]
  },
  {
    "id": "joints-soft-tissue-pathology",
    "title": "Joints and soft tissue pathology",
    "description": "Pathology of joints and soft tissues includes arthritis, bursitis, and soft tissue tumors. These conditions can cause pain, swelling, and functional impairment.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN AND MUSCULOSKELETAL SYSTEM"],
    "questions": [
      "What are the main types of arthritis?",
      "How are soft tissue tumors classified?",
      "What diagnostic tools are used for joint diseases?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Rheumatoid Arthritis",
      "Osteoarthritis",
      "Synovial Sarcoma",
      "Bursitis",
      "MRI and Arthroscopy"
    ]
  },
  {
    "id": "skin-pathology",
    "title": "Skin pathology",
    "description": "Skin pathology includes inflammatory, infectious, and neoplastic diseases. Recognizing skin lesions can provide clues to systemic illnesses.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["SKIN AND MUSCULOSKELETAL SYSTEM"],
    "questions": [
      "What are common inflammatory skin diseases?",
      "How are skin neoplasms diagnosed?",
      "What is the significance of skin as a marker for systemic disease?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Dermatitis",
      "Psoriasis",
      "Skin Cancers",
      "Biopsy Techniques",
      "Systemic Associations"
    ]
  },

  {
    "id": "infective-vascular-cns-pathology",
    "title": "Infective & Vascular CNS pathology",
    "description": "Infective and vascular pathologies of the CNS include meningitis, encephalitis, stroke, and hemorrhage. These conditions can be rapidly fatal without prompt intervention.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NERVOUS SYSTEM"],
    "questions": [
      "What are the common infections of the central nervous system?",
      "How does vascular pathology lead to neurological deficits?",
      "What diagnostic approaches are used for CNS infections and strokes?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Meningitis",
      "Encephalitis",
      "Ischemic Stroke",
      "Hemorrhagic Stroke",
      "Imaging Techniques"
    ]
  },
  {
    "id": "degenerative-toxic-metabolic-cns",
    "title": "Degenerative, Toxic & Metabolic CNS disorders",
    "description": "Degenerative, toxic, and metabolic CNS disorders include diseases like Alzheimer's, Parkinson's, and metabolic encephalopathies. These result in progressive neurological dysfunction.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NERVOUS SYSTEM"],
    "questions": [
      "What are the main features of neurodegenerative diseases?",
      "How do toxins and metabolic imbalances affect the CNS?",
      "What are the diagnostic criteria for Alzheimer's disease?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Alzheimer's Disease",
      "Parkinsonism",
      "Hepatic Encephalopathy",
      "Toxic Neuropathies",
      "Diagnostic Biomarkers"
    ]
  },
  {
    "id": "cns-tumours",
    "title": "CNS Tumours",
    "description": "CNS tumors include primary and secondary neoplasms, often presenting with neurological symptoms. Early diagnosis is critical for better outcomes.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NERVOUS SYSTEM"],
    "questions": [
      "What are common types of primary CNS tumors?",
      "How are CNS tumors classified and graded?",
      "What are the treatment options for brain tumors?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Gliomas",
      "Meningiomas",
      "Metastatic Tumors",
      "Neuroimaging",
      "Surgical and Non-surgical Therapies"
    ]
  },
  {
    "id": "peripheral-nerves-neuromuscular-pathology",
    "title": "Peripheral nerves & Neuromuscular pathology",
    "description": "Peripheral nerve and neuromuscular pathologies include neuropathies, myopathies, and motor neuron diseases. These affect movement, sensation, and muscle strength.",
    "category": "Pathology",
    "difficulty": "",
    "estimatedTime": 0,
    "tags": ["NERVOUS SYSTEM"],
    "questions": [
      "What are the common causes of peripheral neuropathy?",
      "How are neuromuscular diseases diagnosed?",
      "What are the features of motor neuron disease?"
    ],
    "funFacts": [],
    "relatedTopics": [
      "Peripheral Neuropathy",
      "Muscular Dystrophies",
      "Motor Neuron Disease",
      "Electromyography",
      "Genetic Testing"
    ]
  },

  //till pathology here
  
]