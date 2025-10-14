export interface VideosData {
  subject: string;
  topics: {
    topic: string;
    subtopics: {
      title: string;
      video_length: string;
    }[];
  }[];
}

export interface MysteryTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: number;
  tags: string[];
  questions: string[];
  funFacts: string[];
  relatedTopics: string[];
}

export const VideosData: VideosData[] = [
  {
    subject: "Anatomy",
    topics: [
      {
        topic: "Embryology",
        subtopics: [
          {
            title: "How to Approach Anatomy Edition 8",
            video_length: "3 Min",
          },
          {
            title: "Gametogenesis",
            video_length: "33 Min",
          },
          {
            title: "1st and 2nd Week of Development",
            video_length: "38 Min",
          },
          {
            title: "3rd Week Development",
            video_length: "35 Min",
          },
        ],
      },
      {
        topic: "Histology",
        subtopics: [
          {
            title: "Histology: Part 1",
            video_length: "47 Min",
          },
          {
            title: "Histology: Part 2",
            video_length: "34 Min",
          },
          {
            title: "Histology: Part 3",
            video_length: "50 Min",
          },
        ],
      },
      {
        topic: "Neuroanatomy",
        subtopics: [
          {
            title: "Development of Neural Tube",
            video_length: "21 Min",
          },
          {
            title: "Functional Columns of Cranial Nerve Nuclei",
            video_length: "24 Min",
          },
          {
            title: "Neuroanatomy basics",
            video_length: "7 Min",
          },
          {
            title: "CSF and Ventricles",
            video_length: "65 Min",
          },
          {
            title: "Spinal Cord",
            video_length: "57 Min",
          },
          {
            title: "Brain Stem",
            video_length: "64 Min",
          },
          {
            title: "Cerebellum",
            video_length: "22 Min",
          },
          {
            title: "Cerebrum",
            video_length: "28 Min",
          },
          {
            title: "White Matter of Cerebrum",
            video_length: "39 Min",
          },
          {
            title: "Basal Ganglia",
            video_length: "27 Min",
          },
          {
            title: "Blood Supply of Brain",
            video_length: "42 Min",
          },
        ],
      },
      {
        topic: "Head and Neck",
        subtopics: [
          {
            title: "Pharyngeal Arches, Clefts and Pouches",
            video_length: "36 Min",
          },
          {
            title: "Development of Tongue, Pituitary, Face, Palate and Thyroid",
            video_length: "25 Min",
          },
          {
            title: "Osteology of Head and Neck",
            video_length: "37 Min",
          },
          {
            title: "Scalp and Face",
            video_length: "27 Min",
          },
          {
            title: "Deep Cervical Fascia and Triangles of Neck",
            video_length: "66 Min",
          },
          {
            title: "Neurovascular Structures in Neck",
            video_length: "27 Min",
          },
          {
            title: "Infratemporal Fossa",
            video_length: "74 Min",
          },
          {
            title: "Pterygopalatine Fossa",
            video_length: "39 Min",
          },
          {
            title: "Glands in Head and Neck",
            video_length: "53 Min",
          },
          {
            title: "Dural Folds and Dural Venous Sinuses",
            video_length: "56 Min",
          },
          {
            title: "Dural Folds and Dural Venous Sinuses",
            video_length: "43 Min",
          },
          {
            title: "Orbit and Extra Ocular Muscles",
            video_length: "43 Min",
          },
          {
            title: "3rd, 4th and 6th Cranial Nerves",
            video_length: "25 Min",
          },
          {
            title: "Nose",
            video_length: "20 Min",
          },
          {
            title: "Tongue and Hypoglossal nerve",
            video_length: "30 Min",
          },
          {
            title: "Larynx",
            video_length: "56 Min",
          },
          {
            title: "Pharynx",
            video_length: "47 Min",
          },
          {
            title: "Facial Nerve, Glossopharyngeal Nerve and Vagus Nerve",
            video_length: "45 Min",
          },
        ],
      },
      {
        topic: "Upper Limb",
        subtopics: [
          {
            title: "Introduction to Upper Limb",
            video_length: "12 Min",
          },
          {
            title: "Pectoral Region, Back and Scapular Region",
            video_length: "62 Min",
          },
          {
            title: "Brachial Plexus and Axillary Nerve",
            video_length: "55 Min",
          },
          {
            title:
              "Radial Nerve, Dorsal Digital Expansion and Anatomical Snuffbox",
            video_length: "66 Min",
          },
          {
            title: "Median Nerve",
            video_length: "38 Min",
          },
          {
            title: "Ulnar Nerve",
            video_length: "30 Min",
          },
          {
            title: "Vessels of Upper Limb",
            video_length: "35 Min",
          },
          {
            title: "Carpal Bones and Flexor Retinaculum",
            video_length: "17 Min",
          },
          {
            title: "Spaces of hand",
            video_length: "15 Min",
          },
          {
            title: "Breast",
            video_length: "14 Min",
          },
        ],
      },
      {
        topic: "Thorax",
        subtopics: [
          {
            title: "Heart Tube and Septum Formation",
            video_length: "35 Min",
          },
          {
            title: "Development of Veins",
            video_length: "40 Min",
          },
          {
            title: "Development of arch arteries",
            video_length: "24 Min",
          },
          {
            title: "Fetal circulation",
            video_length: "14 Min",
          },
          {
            title: "Thorax Osteology",
            video_length: "17 Min",
          },
          {
            title: "Intercostal Spaces and its Contents",
            video_length: "27 Min",
          },
          {
            title: "Pericardium and External Features of Heart",
            video_length: "31 Min",
          },
          {
            title: "Blood Supply of Heart",
            video_length: "27 Min",
          },
          {
            title: "Right Atrium, Right Ventricle and Nerve Supply",
            video_length: "20 Min",
          },
          {
            title: "Pleura and Lungs",
            video_length: "34 Min",
          },
          {
            title: "Mediastinum and Its Contents",
            video_length: "22 Min",
          },
          {
            title: "Diaphragm",
            video_length: "22 Min",
          },
        ],
      },
      {
        topic: "Abdomen - E8",
        subtopics: [
          {
            title: "Gut Tube and Respiratory System Development",
            video_length: "19 Min",
          },
          {
            title: "Foregut Development",
            video_length: "24 Min",
          },
          {
            title: "Midgut development",
            video_length: "31 Min",
          },
          {
            title: "Hindgut Development",
            video_length: "11 Min",
          },
          {
            title: "Anterior Abdominal wall",
            video_length: "24 Min",
          },
          {
            title: "Inguinal Canal",
            video_length: "33 Min",
          },
          {
            title: "Peritoneum",
            video_length: "38 Min",
          },
          {
            title: "Anatomy of Stomach",
            video_length: "34 Min",
          },
          {
            title: "Duodenum and Pancreas",
            video_length: "44 Min",
          },
          {
            title: "Large Intestine",
            video_length: "10 Min",
          },
          {
            title: "Liver",
            video_length: "26 Min",
          },
          {
            title: "Extrahepatic Biliary Apparatus and Spleen",
            video_length: "27 Min",
          },
          {
            title: "Blood Supply of Abdomen and Pelvis",
            video_length: "36 Min",
          },
          {
            title: "Development of Kidneys and Renal Anatomy",
            video_length: "41 Min",
          },
          {
            title: "Development of Gonads",
            video_length: "32 Min",
          },
          {
            title: "Perineum: Part 1",
            video_length: "52 Min",
          },
          {
            title: "Perineum: Part 2",
            video_length: "34 Min",
          },
          {
            title: "Female Internal Genitalia",
            video_length: "45 Min",
          },
          {
            title: "Rectum and Anal Canal",
            video_length: "25 Min",
          },
        ],
      },
      {
        topic: "Lower Limb",
        subtopics: [
          {
            title:
              "Cutaneous innervation of lower limb, Lumbar plexus and Great saphenous vein",
            video_length: "16 Min",
          },
          {
            title: "Front of thigh, Adductor canal and Popliteal Fossa",
            video_length: "71 Min",
          },
          {
            title: "Gluteal region and Hamstring muscles",
            video_length: "40 Min",
          },
          {
            title: "Knee joint",
            video_length: "28 Min",
          },
          {
            title: "Leg and Ankle Joint",
            video_length: "50 Min",
          },
          {
            title: "Arteries of Lower Limb",
            video_length: "24 Min",
          },
          {
            title: "Layers of the Sole and Arches of the Foot",
            video_length: "27 Min",
          },
        ],
      },
      {
        topic: "General Anatomy",
        subtopics: [
          {
            title: "General Anatomy",
            video_length: "34 Min",
          },
        ],
      },
    ],
  },

  {
    subject: "Biochemistry",
    topics: [
      {
        topic: "General Topics",
        subtopics: [
          {
            title: "How to Approach Biochemistry Edition 8",
            video_length: "6 Min",
          },
          {
            title: "Metabolism in Fed and Fasting State",
            video_length: "66 Min",
          },
          {
            title: "Concept of Enzyme Regulation",
            video_length: "24 Min",
          },
        ],
      },
      {
        topic: "Enzymology",
        subtopics: [
          {
            title: "Introduction to Enzymes",
            video_length: "27 Min",
          },
          {
            title: "Classification of Enzymes",
            video_length: "67 Min",
          },
          {
            title: "Mechanism of Action of Enzymes",
            video_length: "37 Min",
          },
          {
            title: "Enzyme Kinetics",
            video_length: "45 Min",
          },
          {
            title: "Enzyme Inhibition",
            video_length: "33 Min",
          },
          {
            title: "Enzyme Regulation",
            video_length: "43 Min",
          },
          {
            title: "Clinical Enzymology",
            video_length: "52 Min",
          },
        ],
      },
      {
        topic: "Carbohydrates",
        subtopics: [
          {
            title: "Chemistry of Carbohydrates",
            video_length: "61 Min",
          },
          {
            title: "Glycosaminoglycans",
            video_length: "43 Min",
          },
          {
            title: "Glucose Transporters",
            video_length: "34 Min",
          },
          {
            title: "Glycolysis: Part 1",
            video_length: "53 Min",
          },
          {
            title: "Glycolysis: Part 2",
            video_length: "27 Min",
          },
          {
            title: "Pyruvate Dehydrogenase",
            video_length: "32 Min",
          },
          {
            title: "Glycogen Metabolism",
            video_length: "47 Min",
          },
          {
            title: "Glycogen Storage Disorders",
            video_length: "52 Min",
          },
          {
            title: "Gluconeogenesis",
            video_length: "36 Min",
          },
          {
            title: "Minor Metabolic Pathways",
            video_length: "70 Min",
          },
        ],
      },
      {
        topic: "Lipids",
        subtopics: [
          {
            title: "Chemistry of Lipids",
            video_length: "46 Min",
          },
          {
            title: "Phospholipids",
            video_length: "60 Min",
          },
          {
            title: "Lipid Metabolism in Fasting State",
            video_length: "73 Min",
          },
          {
            title: "Lipid Metabolism in Fed State",
            video_length: "56 Min",
          },
          {
            title: "Ketone Body Synthesis",
            video_length: "26 Min",
          },
          {
            title: "Lipoproteins and its Metabolism",
            video_length: "48 Min",
          },
          {
            title: "Dyslipidemia",
            video_length: "43 Min",
          },
        ],
      },
      {
        topic: "Proteins & Amino Acids",
        subtopics: [
          {
            title: "Chemistry of Amino Acids",
            video_length: "70 Min",
          },
          {
            title: "Fibrous Proteins",
            video_length: "29 Min",
          },
          {
            title: "General Amino Acid Metabolism",
            video_length: "40 Min",
          },
          {
            title: "Urea Cycle and Its Disorders",
            video_length: "43 Min",
          },
          {
            title: "Aromatic Amino Acids",
            video_length: "67 Min",
          },
          {
            title: "Sulphur Containing Amino Acids",
            video_length: "47 Min",
          },
          {
            title: "Tryptophan",
            video_length: "34 Min",
          },
          {
            title: "Miscellaneous Amino Acids",
            video_length: "62 Min",
          },
        ],
      },
      {
        topic: "Bioenergetics",
        subtopics: [
          {
            title: "Krebs Cycle",
            video_length: "36 Min",
          },
          {
            title: "Electron Transport Chain",
            video_length: "49 Min",
          },
        ],
      },
      {
        topic: "Molecular Biology",
        subtopics: [
          {
            title: "Chemistry of Nucleotides",
            video_length: "25 Min",
          },
          {
            title: "Metabolism of Nucleotides",
            video_length: "47 Min",
          },
          {
            title: "Structure and Organisation of DNA",
            video_length: "47 Min",
          },
          {
            title: "DNA Replication",
            video_length: "76 Min",
          },
          {
            title: "Transcription",
            video_length: "73 Min",
          },
          {
            title: "Translation",
            video_length: "49 Min",
          },
          {
            title: "Regulation of Gene Expression",
            video_length: "63 Min",
          },
          {
            title: "Hybridization Techniques",
            video_length: "45 Min",
          },
          {
            title: "Recombinant DNA Technology",
            video_length: "55 Min",
          },
          {
            title: "Amplification and Sequencing Techniques",
            video_length: "84 Min",
          },
          {
            title: "Mutation",
            video_length: "33 Min",
          },
        ],
      },
      {
        topic: "Vitamins",
        subtopics: [
          {
            title: "Fat Soluble Vitamins",
            video_length: "78 Min",
          },
          {
            title: "Hematopoietic Vitamins",
            video_length: "43 Min",
          },
          {
            title: "Energy Releasing Vitamins",
            video_length: "37 Min",
          },
          {
            title: "Vitamin B6 and C",
            video_length: "23 Min",
          },
          {
            title: "Heme Metabolism",
            video_length: "60 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Physiology",
    topics: [
      {
        topic: "General Physiology",
        subtopics: [
          { title: "Homeostasis", video_length: "37 Min" },
          { title: "Cellular Physiology", video_length: "49 Min" },
          { title: "Cell Organelles", video_length: "58 Min" },
          {
            title: "Cytoskeletal Filaments and Cellular Junctions",
            video_length: "48 Min",
          },
          {
            title: "Cellular Messengers and Receptors",
            video_length: "52 Min",
          },
          { title: "Membrane Transport", video_length: "53 Min" },
          { title: "Membrane Potentials", video_length: "40 Min" },
          { title: "Cellular Fluids", video_length: "49 Min" },
        ],
      },
      {
        topic: "Nerve Muscle Physiology",
        subtopics: [
          { title: "Characteristics of Nerve Fibres", video_length: "64 Min" },
          { title: "Classification of Nerve Fibres", video_length: "44 Min" },
          { title: "Skeletal Muscles", video_length: "63 Min" },
          { title: "Properties of Skeletal Muscles", video_length: "52 Min" },
          { title: "Cardiac and Smooth Muscles", video_length: "48 Min" },
          {
            title: "Synaptic Transmission and Neurotransmitters",
            video_length: "74 Min",
          },
        ],
      },
      {
        topic: "Central Nervous System",
        subtopics: [
          { title: "Sensory Receptors", video_length: "71 Min" },
          { title: "Somatosensory Pathways", video_length: "43 Min" },
          { title: "Vision", video_length: "68 Min" },
          { title: "Hearing, Smell and Taste", video_length: "53 Min" },
          { title: "Descending Motor Pathways", video_length: "58 Min" },
          { title: "Spinal Reflexes", video_length: "60 Min" },
          { title: "Cerebellum and Basal Ganglia", video_length: "63 Min" },
          { title: "Limbic System and Hypothalamus", video_length: "43 Min" },
          { title: "Learning and Memory", video_length: "57 Min" },
          { title: "CSF, CBF and BBB", video_length: "34 Min" },
          { title: "EEG and Sleep", video_length: "57 Min" },
        ],
      },
      {
        topic: "The Respiratory System",
        subtopics: [
          {
            title: "Structure Function Relationship in Lung",
            video_length: "51 Min",
          },
          { title: "Mechanics of Breathing", video_length: "53 Min" },
          { title: "Ventilation Perfusion Ratio", video_length: "29 Min" },
          { title: "Diffusion and Transport of Gases", video_length: "61 Min" },
          { title: "Neural Regulation of Respiration", video_length: "51 Min" },
          {
            title: "Chemical Regulation of Respiration",
            video_length: "41 Min",
          },
          { title: "Environmental Physiology", video_length: "35 Min" },
        ],
      },
      {
        topic: "The Cardiovascular System",
        subtopics: [
          { title: "Cardiac Action Potentials", video_length: "45 Min" },
          { title: "ECG and JVP", video_length: "51 Min" },
          { title: "Cardiac Cycle", video_length: "61 Min" },
          { title: "Cardiac Output", video_length: "55 Min" },
          { title: "Hematopoiesis & Blood Groups", video_length: "46 Min" },
          { title: "Characteristics of Blood Vessels", video_length: "43 Min" },
          { title: "Hemodynamics", video_length: "37 Min" },
          { title: "Vascular Injury", video_length: "34 Min" },
          { title: "Regulation of Blood Pressure", video_length: "59 Min" },
        ],
      },
      {
        topic: "Gastrointestinal System - E8",
        subtopics: [
          { title: "Gastrointestinal Secretions", video_length: "79 Min" },
          { title: "Gastrointestinal Hormones", video_length: "39 Min" },
          { title: "Digestion and Absorption", video_length: "43 Min" },
          { title: "Gastrointestinal Motility", video_length: "56 Min" },
        ],
      },
      {
        topic: "Renal Physiology",
        subtopics: [
          { title: "Glomerular Filtration Rate", video_length: "62 Min" },
          { title: "Proximal Convoluted Tubule", video_length: "42 Min" },
          {
            title: "Loop of Henle and Distal Convoluted Tubule",
            video_length: "48 Min",
          },
          {
            title: "Collecting Duct and Micturition Reflex",
            video_length: "57 Min",
          },
          { title: "Acid Base Balance", video_length: "57 Min" },
        ],
      },
      {
        topic: "Endocrine Physiology",
        subtopics: [
          { title: "Pituitary Gland", video_length: "48 Min" },
          { title: "Thyroid Gland", video_length: "51 Min" },
          { title: "Endocrine Pancreas", video_length: "49 Min" },
          { title: "Adrenal Gland", video_length: "63 Min" },
          { title: "Calcium Homeostasis", video_length: "57 Min" },
        ],
      },
      {
        topic: "Reproductive Physiology",
        subtopics: [
          { title: "Male Reproduction", video_length: "51 Min" },
          { title: "Female Reproduction", video_length: "61 Min" },
        ],
      },
      {
        topic: "Exercise Physiology",
        subtopics: [
          { title: "Exercise Physiology", video_length: "40 Min" },
          { title: "Regulation of Body Temperature", video_length: "47 Min" },
        ],
      },
    ],
  },
  {
    subject: "Pharmacology",
    topics: [
      {
        topic: "General Pharmacology",
        subtopics: [
          {
            title: "How to Approach Pharmacology Edition 8",
            video_length: "8 Min",
          },
          {
            title: "Introduction to Pharmacokinetics and Pharmacodynamics",
            video_length: "16 Min",
          },
          {
            title: "Pharmacokinetics: Absorption - Part 1",
            video_length: "30 Min",
          },
          {
            title: "Pharmacokinetics: Absorption - Part 2",
            video_length: "52 Min",
          },
          {
            title: "Pharmacokinetics: Distribution",
            video_length: "30 Min",
          },
          {
            title: "Pharmacokinetics: Metabolism",
            video_length: "38 Min",
          },
          {
            title: "Pharmacokinetics: Excretion",
            video_length: "60 Min",
          },
          {
            title:
              "Pharmacodynamics: Potency, Efficacy and Dose Response Curve",
            video_length: "61 Min",
          },
          {
            title: "Pharmacodynamics: Drug Receptors and Interactions",
            video_length: "70 Min",
          },
          {
            title: "Drug Development and Clinical Trials",
            video_length: "49 Min",
          },
          {
            title:
              "ADR and Pharmacovigilance, Pharmacogenetics and Pharmacogenomics",
            video_length: "45 Min",
          },
          {
            title: "General Pharmacology: Miscellaneous",
            video_length: "57 Min",
          },
        ],
      },
      {
        topic: "Autonomic Nervous System",
        subtopics: [
          {
            title: "Introduction to Autonomic Nervous System (ANS)",
            video_length: "54 Min",
          },
          {
            title: "Cholinergic Drugs",
            video_length: "73 Min",
          },
          {
            title: "Anti-cholinergic Drugs",
            video_length: "46 Min",
          },
          {
            title:
              "Sympathetic Nervous System: Neurotransmitters and Receptors",
            video_length: "42 Min",
          },
          {
            title: "Adrenergic Drugs: Part 1",
            video_length: "62 Min",
          },
          {
            title: "Adrenergic Drugs: Part 2",
            video_length: "59 Min",
          },
          {
            title: "Anti-adrenergic Drugs",
            video_length: "51 Min",
          },
        ],
      },
      {
        topic: "Cardiovascular System",
        subtopics: [
          {
            title: "Anti-arrhythmic Drugs: Part 1",
            video_length: "66 Min",
          },
          {
            title: "Anti-arrhythmic Drugs: Part 2",
            video_length: "45 Min",
          },
          {
            title: "Drugs used in CHF",
            video_length: "75 Min",
          },
          {
            title: "Vasodilators",
            video_length: "69 Min",
          },
          {
            title: "Anti-hypertensive Drugs",
            video_length: "33 Min",
          },
          {
            title: "Anti-anginal Drugs",
            video_length: "27 Min",
          },
          {
            title: "Hypolipidemic Drugs",
            video_length: "66 Min",
          },
        ],
      },
      {
        topic: "Renal System",
        subtopics: [
          {
            title: "Diuretics: Part 1",
            video_length: "68 Min",
          },
          {
            title: "Diuretics: Part 2",
            video_length: "85 Min",
          },
        ],
      },
      {
        topic: "Central and Peripheral Nervous System",
        subtopics: [
          {
            title: "Anti-epileptic Drugs: Part 1",
            video_length: "69 Min",
          },
          {
            title: "Anti-epileptic Drugs: Part 2",
            video_length: "29 Min",
          },
          {
            title: "Sedative Hypnotic Drugs",
            video_length: "43 Min",
          },
          {
            title: "Opioids: Part 1",
            video_length: "47 Min",
          },
          {
            title: "Opioids: Part 2",
            video_length: "54 Min",
          },
          {
            title: "Affect Disorders: Part 1",
            video_length: "37 Min",
          },
          {
            title: "Affect Disorders: Part 2",
            video_length: "77 Min",
          },
          {
            title: "Anti-psychotic Drugs",
            video_length: "60 Min",
          },
          {
            title: "Neurodegenerative Disorders",
            video_length: "50 Min",
          },
          {
            title: "Alcohol and Smoking Dependence",
            video_length: "35 Min",
          },
        ],
      },
      {
        topic: "Antimicrobials",
        subtopics: [
          {
            title: "Introduction to Antibacterial Drugs",
            video_length: "46 Min",
          },
          {
            title: "Cell Wall Synthesis Inhibitors: Part 1",
            video_length: "64 Min",
          },
          {
            title: "Cell Wall Synthesis Inhibitors: Part 2",
            video_length: "56 Min",
          },
          {
            title: "Cell Wall Synthesis Inhibitors: Part 3",
            video_length: "41 Min",
          },
          {
            title: "Protein Synthesis Inhibitors: Part 1",
            video_length: "51 Min",
          },
          {
            title: "Protein Synthesis Inhibitors: Part 2",
            video_length: "37 Min",
          },
          {
            title: "Other Antibacterial Drugs",
            video_length: "66 Min",
          },
          {
            title: "Anti-fungal Drugs",
            video_length: "42 Min",
          },
          {
            title: "Non-retroviral Drugs",
            video_length: "68 Min",
          },
          {
            title: "Anti-retroviral Drugs",
            video_length: "38 Min",
          },
          {
            title: "Anti-mycobacterial Drugs",
            video_length: "55 Min",
          },
          {
            title: "Anti-protozoal Drugs",
            video_length: "69 Min",
          },
          {
            title: "Anti-helminthic Drugs",
            video_length: "19 Min",
          },
        ],
      },
      {
        topic: "Endocrine System",
        subtopics: [
          {
            title: "Anti-diabetic Drugs: Part 1",
            video_length: "53 Min",
          },
          {
            title: "Anti-diabetic Drugs: Part 2",
            video_length: "46 Min",
          },
          {
            title: "Drugs Acting on Reproductive System",
            video_length: "31 Min",
          },
          {
            title: "Growth Hormone and Related Drugs",
            video_length: "24 Min",
          },
          {
            title: "Steroids",
            video_length: "26 Min",
          },
          {
            title: "Drugs acting on Bone",
            video_length: "30 Min",
          },
          {
            title: "Drugs acting on Thyroid",
            video_length: "28 Min",
          },
        ],
      },
      {
        topic: "Autacoids",
        subtopics: [
          {
            title: "Anti-histaminics",
            video_length: "38 Min",
          },
          {
            title: "Serotonin-related Drugs",
            video_length: "43 Min",
          },
          {
            title: "Eicosanoids",
            video_length: "55 Min",
          },
          {
            title: "Gout",
            video_length: "24 Min",
          },
          {
            title: "Rheumatoid Arthritis",
            video_length: "24 Min",
          },
        ],
      },
      {
        topic: "Hematology",
        subtopics: [
          {
            title: "Anti-aggregants and Hematopoietic Agents",
            video_length: "44 Min",
          },
          {
            title: "Anti-coagulants and Fibrinolytics",
            video_length: "82 Min",
          },
        ],
      },
      {
        topic: "Respiratory System",
        subtopics: [
          {
            title: "Bronchial Asthma",
            video_length: "35 Min",
          },
          {
            title: "Anti-tussives",
            video_length: "15 Min",
          },
        ],
      },
      {
        topic: "Gastrointestinal Drugs",
        subtopics: [
          {
            title: "Peptic Ulcer Disease",
            video_length: "46 Min",
          },
          {
            title: "Prokinetics and Antiemetics",
            video_length: "23 Min",
          },
          {
            title: "Laxatives and Antidiarrheal Drugs",
            video_length: "24 Min",
          },
        ],
      },
      {
        topic: "Immunomodulators",
        subtopics: [
          {
            title: "Immunomodulators",
            video_length: "37 Min",
          },
        ],
      },
      {
        topic: "Anti-neoplastic Agents",
        subtopics: [
          {
            title: "Introduction to Anti-cancer Drugs",
            video_length: "68 Min",
          },
          {
            title: "Non-cell Cycle Specific Drugs",
            video_length: "43 Min",
          },
          {
            title: "Cell Cycle Specific Drugs",
            video_length: "41 Min",
          },
          {
            title: "Miscellaneous Drugs",
            video_length: "32 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Microbiology",
    topics: [
      {
        topic: "General Microbiology and General Bacteriology - E8",
        subtopics: [
          {
            title: "How to Approach Microbiology Edition 8",
            video_length: "6 Min",
          },
          {
            title: "Microscopes",
            video_length: "30 Min",
          },
          {
            title: "Bacterial Stains",
            video_length: "30 Min",
          },
          {
            title: "Bacterial Anatomy and Typing",
            video_length: "87 Min",
          },
          {
            title: "Biochemicals and Antibiotic Sensitivity Tests",
            video_length: "34 Min",
          },
          {
            title: "Bacterial Cultivation",
            video_length: "67 Min",
          },
          {
            title: "Bacterial Genetics",
            video_length: "45 Min",
          },
          {
            title: "Miscellaneous Topics in Microbiology",
            video_length: "28 Min",
          },
          {
            title: "Sterilization and Disinfection: Part 1",
            video_length: "46 Min",
          },
          {
            title: "Sterilization and Disinfection: Part 2",
            video_length: "42 Min",
          },
          {
            title: "Standard and Transmission Based Precautions",
            video_length: "55 Min",
          },
        ],
      },
      {
        topic: "Organism Specific Bacteriology - E8",
        subtopics: [
          {
            title: "Staphylococcus",
            video_length: "79 Min",
          },
          {
            title: "Alpha and Gamma Hemolytic Streptococcus",
            video_length: "48 Min",
          },
          {
            title: "Beta Hemolytic Streptococcus",
            video_length: "41 Min",
          },
          {
            title: "Corynebacterium",
            video_length: "46 Min",
          },
          {
            title: "Bacillus",
            video_length: "39 Min",
          },
          {
            title: "Actinomycetes and Listeria",
            video_length: "41 Min",
          },
          {
            title: "Clostridium perfringens and difficile",
            video_length: "52 Min",
          },
          {
            title: "Clostridium botulinum and C. tetani",
            video_length: "41 Min",
          },
          {
            title: "Mycobacterium",
            video_length: "67 Min",
          },
          {
            title: "Neisseria and Moraxella",
            video_length: "42 Min",
          },
          {
            title: "Escherichia and Shigella",
            video_length: "66 Min",
          },
          {
            title: "Salmonella",
            video_length: "62 Min",
          },
          {
            title: "Klebsiella, Proteus and Yersinia",
            video_length: "49 Min",
          },
          {
            title: "Vibrio",
            video_length: "44 Min",
          },
          {
            title: "Pseudomonas and Burkholderia",
            video_length: "39 Min",
          },
          {
            title: "Treponema",
            video_length: "47 Min",
          },
          {
            title: "Leptospira and Borrelia",
            video_length: "41 Min",
          },
          {
            title: "Campylobacter and Helicobacter",
            video_length: "24 Min",
          },
          {
            title: "Brucella and Bordetella",
            video_length: "44 Min",
          },
          {
            title: "Hemophilus and Legionella",
            video_length: "36 Min",
          },
          {
            title: "Rickettsia and Orientia",
            video_length: "33 Min",
          },
          {
            title: "Coxiella, Bartonella and Ehrlichia",
            video_length: "32 Min",
          },
          {
            title: "Chlamydia and Mycoplasma",
            video_length: "57 Min",
          },
          {
            title: "Miscellaneous Gram Negative Bacteria",
            video_length: "25 Min",
          },
        ],
      },
      {
        topic: "Immunology",
        subtopics: [
          {
            title: "Innate Immunity",
            video_length: "69 Min",
          },
          {
            title: "Antigens",
            video_length: "43 Min",
          },
          {
            title: "Antibodies",
            video_length: "56 Min",
          },
          {
            title: "Complement System",
            video_length: "45 Min",
          },
          {
            title: "Major Histocompatibility Complex",
            video_length: "37 Min",
          },
          {
            title: "Adaptive Immunity: Part 1",
            video_length: "52 Min",
          },
          {
            title: "Adaptive Immunity: Part 2",
            video_length: "97 Min",
          },
          {
            title: "Antigen-Antibody Reactions",
            video_length: "62 Min",
          },
        ],
      },
      {
        topic: "Virology",
        subtopics: [
          {
            title: "General Virology",
            video_length: "68 Min",
          },
          {
            title: "Papilloma and Polyoma Viruses",
            video_length: "26 Min",
          },
          {
            title: "Parvoviruses, Adenoviruses and Pox Viruses",
            video_length: "34 Min",
          },
          {
            title: "Herpes Viruses: Part 1",
            video_length: "43 Min",
          },
          {
            title: "Herpes Viruses: Part 2",
            video_length: "48 Min",
          },
          {
            title: "Hepatitis B and D",
            video_length: "56 Min",
          },
          {
            title: "Hepatitis A and E",
            video_length: "25 Min",
          },
          {
            title: "Influenza Virus",
            video_length: "33 Min",
          },
          {
            title: "Measles, Mumps and Rubella",
            video_length: "46 Min",
          },
          {
            title: "Rhabdoviruses and Reoviruses",
            video_length: "43 Min",
          },
          {
            title: "Flaviviruses",
            video_length: "39 Min",
          },
          {
            title: "Arena, Filo, Bunya and Toga Viruses",
            video_length: "35 Min",
          },
          {
            title: "Prions and Transmissible Spongiform Encephalopathy",
            video_length: "36 Min",
          },
        ],
      },
      {
        topic: "Protozoology - E8",
        subtopics: [
          {
            title: "Amoebae",
            video_length: "54 Min",
          },
          {
            title: "Giardia and Trichomonas",
            video_length: "22 Min",
          },
          {
            title: "Leishmania and Trypanosoma",
            video_length: "57 Min",
          },
          {
            title: "Plasmodium and Babesia",
            video_length: "49 Min",
          },
          {
            title: "Toxoplasma",
            video_length: "36 Min",
          },
          {
            title: "GI Coccidea and Balantidium",
            video_length: "22 Min",
          },
        ],
      },
      {
        topic: "Helminthology - E8",
        subtopics: [
          {
            title: "Trematodes",
            video_length: "37 Min",
          },
          {
            title: "Cestodes",
            video_length: "42 Min",
          },
          {
            title: "Nematodes: Part 1",
            video_length: "51 Min",
          },
          {
            title: "Nematodes: Part 2",
            video_length: "27 Min",
          },
        ],
      },
      {
        topic: "Mycology",
        subtopics: [
          {
            title: "General Mycology",
            video_length: "36 Min",
          },
          {
            title: "Superficial Mycoses",
            video_length: "23 Min",
          },
          {
            title: "Subcutaneous Mycology",
            video_length: "34 Min",
          },
          {
            title: "Opportunistic Mycoses: Part 1",
            video_length: "51 Min",
          },
          {
            title: "Opportunistic Mycoses: Part 2",
            video_length: "30 Min",
          },
          {
            title: "Dimorphic Fungi",
            video_length: "24 Min",
          },
        ],
      },
      {
        topic: "Clinical Microbiology - E8",
        subtopics: [
          {
            title: "Acute Rheumatic Fever",
            video_length: "43 Min",
          },
          {
            title: "Infective Endocarditis",
            video_length: "48 Min",
          },
          {
            title: "Community Acquired and Hospital Acquired Pneumonia",
            video_length: "59 Min",
          },
          {
            title: "Acute Meningitis",
            video_length: "59 Min",
          },
          {
            title: "Chronic meningitis",
            video_length: "47 Min",
          },
          {
            title: "Encephalitis: Viral and Bacterial",
            video_length: "62 Min",
          },
          {
            title: "Non-inflammatory Diarrhea",
            video_length: "40 Min",
          },
          {
            title: "Inflammatory Diarrhea",
            video_length: "48 Min",
          },
          {
            title: "Myositis and Myonecrosis",
            video_length: "31 Min",
          },
          {
            title: "Genital Ulcer Disease",
            video_length: "32 Min",
          },
          {
            title: "Urinary Tract Infections",
            video_length: "61 Min",
          },
          {
            title: "Urethritis and Vaginitis",
            video_length: "49 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Pathology",
    topics: [
      {
        topic: "GENERAL PATHOLOGY",
        subtopics: [
          {
            title: "How to Approach Pathology Edition 8",
            video_length: "5 Min",
          },
          {
            title: "Cell Adaptations",
            video_length: "48 Min",
          },
          {
            title: "Cell Injury",
            video_length: "40 Min",
          },
          {
            title: "Cell Death",
            video_length: "73 Min",
          },
          {
            title: "Intracellular Accumulations",
            video_length: "65 Min",
          },
          {
            title: "Acute Inflammation",
            video_length: "71 Min",
          },
          {
            title: "Chronic Inflammation",
            video_length: "47 Min",
          },
          {
            title: "Mediators of Inflammation",
            video_length: "64 Min",
          },
          {
            title: "Wound Healing and Tissue Repair",
            video_length: "36 Min",
          },
          {
            title: "Hemodynamics",
            video_length: "30 Min",
          },
          {
            title: "Neoplasia: Basics",
            video_length: "59 Min",
          },
          {
            title: "Types of Carcinogenesis",
            video_length: "40 Min",
          },
          {
            title: "Neoplasia: Hallmarks",
            video_length: "73 Min",
          },
          {
            title: "Lab Diagnosis of Cancer",
            video_length: "43 Min",
          },
          {
            title: "Tumor Diagnosis",
            video_length: "34 Min",
          },
          {
            title: "Genetics: Basics and Mendelian Modes",
            video_length: "74 Min",
          },
          {
            title: "Genetics: Non-Mendelian Modes and Pedigree",
            video_length: "63 Min",
          },
          {
            title: "Genetics: Chromosomal Disorders",
            video_length: "65 Min",
          },
          {
            title: "Genetic Disorders: Diagnosis",
            video_length: "36 Min",
          },
          {
            title: "Hypersensitivity Reactions",
            video_length: "44 Min",
          },
          {
            title: "Transplant Pathology",
            video_length: "51 Min",
          },
          {
            title: "Immunodeficiency Disorders",
            video_length: "37 Min",
          },
          {
            title: "Amyloidosis",
            video_length: "39 Min",
          },
        ],
      },
      {
        topic: "HEMATOLOGY",
        subtopics: [
          {
            title: "RBC: Introduction",
            video_length: "70 Min",
          },
          {
            title: "Peripheral Smear Examination",
            video_length: "40 Min",
          },
          {
            title: "Microcytic Hypochromic Anemia",
            video_length: "73 Min",
          },
          {
            title: "Megaloblastic Anemia",
            video_length: "47 Min",
          },
          {
            title: "Hemolytic Anemia: Part 1",
            video_length: "89 Min",
          },
          {
            title: "Hemolytic Anemia: Part 2",
            video_length: "73 Min",
          },
          {
            title: "WBC: Introduction",
            video_length: "55 Min",
          },
          {
            title: "Acute Lymphoblastic Leukemia",
            video_length: "44 Min",
          },
          {
            title: "Acute Myeloid Leukemia",
            video_length: "45 Min",
          },
          {
            title: "Myeloid Disorders",
            video_length: "46 Min",
          },
          {
            title: "Chronic Leukemias",
            video_length: "48 Min",
          },
          {
            title: "Hodgkin's Lymphoma",
            video_length: "42 Min",
          },
          {
            title: "Non-Hodgkin's Lymphoma",
            video_length: "59 Min",
          },
          {
            title: "Plasma Cell Disorders",
            video_length: "43 Min",
          },
          {
            title: "Hemostasis: Part 1",
            video_length: "63 Min",
          },
          {
            title: "Hemostasis: Part 2",
            video_length: "52 Min",
          },
          {
            title: "Blood Banking and Transfusion Medicine",
            video_length: "59 Min",
          },
          {
            title: "Hematology: Clinical Case Discussions",
            video_length: "38 Min",
          },
        ],
      },
      {
        topic: "CARDIOVASCULAR SYSTEM",
        subtopics: [
          {
            title: "Blood Vessels: Sclerosis",
            video_length: "48 Min",
          },
          {
            title: "Blood Vessels: Vasculitis",
            video_length: "63 Min",
          },
          {
            title: "Vascular Tumors",
            video_length: "33 Min",
          },
          {
            title: "Cardiovascular System: Part 1",
            video_length: "51 Min",
          },
          {
            title: "Cardiovascular System: Part 2",
            video_length: "72 Min",
          },
        ],
      },
      {
        topic: "GENITOURINARY SYSTEM",
        subtopics: [
          {
            title: "Kidney: Basics",
            video_length: "47 Min",
          },
          {
            title: "Nephritic Syndromes",
            video_length: "40 Min",
          },
          {
            title: "Nephrotic Syndrome",
            video_length: "42 Min",
          },
          {
            title: "Renal Involvement in Systemic Diseases",
            video_length: "32 Min",
          },
          {
            title: "Kidney Tumors",
            video_length: "43 Min",
          },
          {
            title: "Male Genital System: Penis and Prostate",
            video_length: "53 Min",
          },
          {
            title: "Male Genital System: Testis",
            video_length: "53 Min",
          },
          {
            title: "Female Genital Tract: Vulva, Vagina and Cervix",
            video_length: "39 Min",
          },
          {
            title: "Female Genital Tract: Uterus and Endometrium",
            video_length: "41 Min",
          },
          {
            title: "Female Genital Tract: Ovaries",
            video_length: "52 Min",
          },
        ],
      },
      {
        topic: "GASTROINTESTINAL SYSTEM",
        subtopics: [
          {
            title: "Esophagus",
            video_length: "36 Min",
          },
          {
            title: "Stomach",
            video_length: "61 Min",
          },
          {
            title: "Intestinal Disorders",
            video_length: "37 Min",
          },
          {
            title: "Inflammatory Bowel Disease",
            video_length: "43 Min",
          },
          {
            title: "Colorectal Polyps and Cancer",
            video_length: "52 Min",
          },
          {
            title: "Liver Pathology: Part 1",
            video_length: "53 Min",
          },
          {
            title: "Liver Pathology: Part 2",
            video_length: "64 Min",
          },
        ],
      },
      {
        topic: "RESPIRATORY SYSTEM",
        subtopics: [
          {
            title: "Obstructive Lung Diseases",
            video_length: "59 Min",
          },
          {
            title: "Restrictive Lung Diseases",
            video_length: "37 Min",
          },
          {
            title: "Granulomas and Infections of Lung",
            video_length: "41 Min",
          },
          {
            title: "Lung Tumors",
            video_length: "54 Min",
          },
        ],
      },
      {
        topic: "ENDOCRINE SYSTEM AND BREAST",
        subtopics: [
          {
            title: "Thyroid: Non-neoplastic Lesions",
            video_length: "36 Min",
          },
          {
            title: "Thyroid Tumors",
            video_length: "41 Min",
          },
          {
            title: "Adrenal Medulla",
            video_length: "36 Min",
          },
          {
            title: "Pituitary and Parathyroid Gland",
            video_length: "46 Min",
          },
          {
            title: "Breast Pathology: Part 1",
            video_length: "41 Min",
          },
          {
            title: "Breast Pathology: Part 2",
            video_length: "60 Min",
          },
        ],
      },
      {
        topic: "SKIN AND MUSCULOSKELETAL SYSTEM",
        subtopics: [
          {
            title: "Dermatopathology",
            video_length: "52 Min",
          },
          {
            title: "Bone and Soft Tissue Lesions",
            video_length: "38 Min",
          },
        ],
      },
      {
        topic: "NERVOUS SYSTEM",
        subtopics: [
          {
            title: "CNS: Non-neoplastic Lesions",
            video_length: "39 Min",
          },
          {
            title: "CNS Tumors",
            video_length: "67 Min",
          },
        ],
      },
      {
        topic: "MISCELLANEOUS - E8",
        subtopics: [
          {
            title: "Systemic Pathology: Clinical Cases",
            video_length: "27 Min",
          },
          {
            title: "Demonstration of Instruments",
            video_length: "21 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Community Medicine",
    topics: [
      {
        topic: "Demography and Family Planning",
        subtopics: [
          {
            title: "How to Approach Community Medicine Edition 8",
            video_length: "4 Min",
          },
          {
            title: "Demographic Cycle",
            video_length: "27 Min",
          },
          {
            title: "Demographic Trends",
            video_length: "31 Min",
          },
          {
            title: "Fertility Rates",
            video_length: "31 Min",
          },
          {
            title: "Survey Techniques",
            video_length: "28 Min",
          },
          {
            title: "Family Planning and Contraception: Part 1",
            video_length: "51 Min",
          },
          {
            title: "Family Planning and Contraception: Part 2",
            video_length: "65 Min",
          },
          {
            title: "National Family Planning Programme",
            video_length: "37 Min",
          },
        ],
      },
      {
        topic: "Maternal and Child Health - E8",
        subtopics: [
          {
            title: "Indicators of MCH Care",
            video_length: "49 Min",
          },
          {
            title: "Preventive Obstetrics: Antenatal Care and Post Natal Care",
            video_length: "51 Min",
          },
          {
            title: "Preventive Paediatrics: Early care",
            video_length: "32 Min",
          },
          {
            title: "Preventive Paediatrics: Growth and Development",
            video_length: "52 Min",
          },
          {
            title: "Social Paediatrics",
            video_length: "20 Min",
          },
          {
            title: "RMNCAH+N: Part 1",
            video_length: "37 Min",
          },
          {
            title: "RMNCAH+N: Part 2 - IMNCI, FRU, Organisation of MCH Care",
            video_length: "39 Min",
          },
        ],
      },
      {
        topic: "Vaccine and Immunization - E8",
        subtopics: [
          {
            title: "Universal Immunization Programme",
            video_length: "62 Min",
          },
          {
            title: "Immunization: Frequently Asked Questions",
            video_length: "43 Min",
          },
          {
            title: "Cold Chain and Vaccine Requirement",
            video_length: "40 Min",
          },
          {
            title: "Vaccine Strains, Waste Management and AEFI",
            video_length: "45 Min",
          },
        ],
      },
      {
        topic: "Epidemiology - E8",
        subtopics: [
          {
            title: "Aim of Epidemiology and Historical Perspective",
            video_length: "15 Min",
          },
          {
            title: "Basics in Epidemiology",
            video_length: "26 Min",
          },
          {
            title: "Epidemiological Methods and Descriptive Epidemiology",
            video_length: "23 Min",
          },
          {
            title: "Analytical and Experimental Epidemiology",
            video_length: "61 Min",
          },
          {
            title: "Bias and Confounding",
            video_length: "34 Min",
          },
          {
            title: "Advanced Epidemiology",
            video_length: "44 Min",
          },
        ],
      },
      {
        topic: "Screening of Disease - E8",
        subtopics: [
          {
            title: "Screening of Disease Concepts",
            video_length: "35 Min",
          },
          {
            title: "Determinants in Screening of Disease",
            video_length: "25 Min",
          },
          {
            title: "Advanced Concepts in Screening of Disease",
            video_length: "72 Min",
          },
        ],
      },
      {
        topic: "Biostatistics - E8",
        subtopics: [
          {
            title: "Data Types and Scales",
            video_length: "35 Min",
          },
          {
            title: "Measures of Central Tendency and Variation",
            video_length: "20 Min",
          },
          {
            title: "Normal Distribution Curve",
            video_length: "26 Min",
          },
          {
            title: "Concept of p-value",
            video_length: "34 Min",
          },
          {
            title:
              "Tests of Significance, Probability Rules and Regression Analysis",
            video_length: "27 Min",
          },
          {
            title: "Skew and Tiles",
            video_length: "19 Min",
          },
          {
            title: "Sampling Methods and Sample Size Calculation",
            video_length: "24 Min",
          },
          {
            title: "Graphs",
            video_length: "55 Min",
          },
          {
            title: "Biostatistics: Questions and Answers",
            video_length: "29 Min",
          },
        ],
      },
      {
        topic: "National Health Programmes - E8",
        subtopics: [
          {
            title: "TB: Epidemiology and Investigations",
            video_length: "45 Min",
          },
          {
            title: "NTEP. Targets, Diagnosis and Management Guidelines",
            video_length: "42 Min",
          },
          {
            title: "NTEP. Strategies, Organisation and Indicators",
            video_length: "49 Min",
          },
          {
            title: "NACP. Targets, Diagnosis and Management",
            video_length: "60 Min",
          },
          {
            title: "NACP. Strategies, Organisation and Indicators",
            video_length: "30 Min",
          },
          {
            title: "NVBDCP. Malaria Epidemiology",
            video_length: "38 Min",
          },
          {
            title: "NVBDCP. Malaria Diagnosis, Treatment and Control",
            video_length: "35 Min",
          },
          {
            title: "NVBDCP. Indicators",
            video_length: "36 Min",
          },
          {
            title: "Japanese Encephalitis",
            video_length: "17 Min",
          },
          {
            title: "Dengue",
            video_length: "23 Min",
          },
          {
            title: "Lymphatic Filariasis",
            video_length: "22 Min",
          },
          {
            title: "Kala-Azar",
            video_length: "19 Min",
          },
          {
            title: "National Leprosy Eradication Program",
            video_length: "38 Min",
          },
          {
            title: "National Polio Surveillance Project",
            video_length: "55 Min",
          },
          {
            title: "NIDDCP, IDSP and ICDS",
            video_length: "41 Min",
          },
        ],
      },
      {
        topic: "Healthcare Planning in India - E8",
        subtopics: [
          {
            title: "Recent Advances in Community Medicine - 2023",
            video_length: "29 Min",
          },
          {
            title: "Health Care System in India",
            video_length: "66 Min",
          },
          {
            title: "Health Planning and Management",
            video_length: "45 Min",
          },
        ],
      },
      {
        topic: "Infectious Disease Epidemiology - E8",
        subtopics: [
          {
            title:
              "Infectious Diseases: Basic Definitions, Chain of Transmission",
            video_length: "40 Min",
          },
          {
            title: "Infectious Diseases: Agent, Host, Case, Carrier",
            video_length: "47 Min",
          },
          {
            title:
              "Infectious Diseases: Modes of Transmission, PPE, Handwashing",
            video_length: "48 Min",
          },
        ],
      },
      {
        topic: "Communicable Diseases - E8",
        subtopics: [
          {
            title: "Smallpox and Chickenpox",
            video_length: "23 Min",
          },
          {
            title: "Measles, Mumps and Rubella",
            video_length: "57 Min",
          },
          {
            title: "Flu, Diphtheria and Pertussis",
            video_length: "30 Min",
          },
          {
            title: "Meningitis",
            video_length: "16 Min",
          },
          {
            title: "Cholera and Diarrhoea Management",
            video_length: "36 Min",
          },
          {
            title: "Typhoid",
            video_length: "28 Min",
          },
          {
            title: "Hepatitis",
            video_length: "39 Min",
          },
          {
            title: "Soil Transmitted Helminthic Infections",
            video_length: "27 Min",
          },
          {
            title: "Zoonoses and Rabies",
            video_length: "32 Min",
          },
          {
            title: "Plague, Yellow fever and KFD",
            video_length: "56 Min",
          },
          {
            title: "Tetanus",
            video_length: "17 Min",
          },
          {
            title: "Rickettsia",
            video_length: "22 Min",
          },
          {
            title: "Leptospirosis",
            video_length: "16 Min",
          },
          {
            title: "Ebola, Zika, and Nipah",
            video_length: "27 Min",
          },
        ],
      },
      {
        topic: "Non-Communicable Diseases - E8",
        subtopics: [
          {
            title: "CVD, Hypertension and Obesity",
            video_length: "33 Min",
          },
          {
            title: "Rheumatic Fever, Cancer, and Sickle Cell Disease",
            video_length: "29 Min",
          },
        ],
      },
      {
        topic: "Nutrition - E8",
        subtopics: [
          {
            title: "Nutrition: Concepts and Macronutrients",
            video_length: "56 Min",
          },
          {
            title: "Nutrition: Micronutrients",
            video_length: "41 Min",
          },
          {
            title: "Nutrition: Recommended Dietary allowance & Millets",
            video_length: "17 Min",
          },
          {
            title: "Nutrition: Food products, Adulterants and Standards",
            video_length: "51 Min",
          },
        ],
      },
      {
        topic: "Environment - E8",
        subtopics: [
          {
            title: "Air and Health",
            video_length: "39 Min",
          },
          {
            title: "Water Sources and Quality of Water",
            video_length: "47 Min",
          },
          {
            title: "Water Purification Methods",
            video_length: "42 Min",
          },
          {
            title: "Housing, Ventilation, Light, Sound, Radiation",
            video_length: "30 Min",
          },
          {
            title: "Waste Management",
            video_length: "37 Min",
          },
          {
            title: "Entomology: Mosquitoes",
            video_length: "46 Min",
          },
          {
            title: "Entomology: Lice, Ticks, Mites and Sandfly",
            video_length: "46 Min",
          },
          {
            title: "Mosquito Control Measures and Insecticides",
            video_length: "41 Min",
          },
        ],
      },
      {
        topic: "Biomedical Waste Management - E8",
        subtopics: [
          {
            title: "Biomedical Waste Management",
            video_length: "49 Min",
          },
        ],
      },
      {
        topic: "Occupational Health - E8",
        subtopics: [
          {
            title: "Occupational Health",
            video_length: "44 Min",
          },
          {
            title: "ESI and Factories Act",
            video_length: "28 Min",
          },
        ],
      },
      {
        topic: "Concept of Health and Disease - E8",
        subtopics: [
          {
            title: "Concepts in Community Medicine",
            video_length: "29 Min",
          },
          {
            title: "Concepts of Control and Prevention",
            video_length: "40 Min",
          },
          {
            title: "Health and Disability Indicators",
            video_length: "47 Min",
          },
        ],
      },
      {
        topic: "Disaster Management - E8",
        subtopics: [
          {
            title: "Disaster Management",
            video_length: "38 Min",
          },
        ],
      },
      {
        topic: "Health Communication - E8",
        subtopics: [
          {
            title: "Health Communication",
            video_length: "32 Min",
          },
        ],
      },
      {
        topic: "International Health Organisations - E8",
        subtopics: [
          {
            title: "International Health Organisations",
            video_length: "28 Min",
          },
        ],
      },
      {
        topic: "Social Medicine - E8",
        subtopics: [
          {
            title: "Social Medicine",
            video_length: "47 Min",
          },
        ],
      },
      {
        topic: "Miscellaneous Topics - E8",
        subtopics: [
          {
            title: "History and Evolution of medicine",
            video_length: "33 Min",
          },
          {
            title: "Preventive Geriatrics",
            video_length: "10 Min",
          },
          {
            title: "Mental Health Programme",
            video_length: "12 Min",
          },
          {
            title: "Genetics and Health",
            video_length: "43 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Ophthalmology",
    topics: [
      {
        topic: "BASIC ANATOMY OF EYE - E8",
        subtopics: [
          { title: "Layers and Structure of Eyeball", video_length: "42 Min" },
          {
            title: "Anatomy of Cornea, Anatomy of Sclera and its Pathologies",
            video_length: "74 Min",
          },
          {
            title: "Anatomy of Uvea, Accommodation with its Anomalies",
            video_length: "68 Min",
          },
          { title: "Anatomy of Retina", video_length: "21 Min" },
          {
            title:
              "Ocular Routes of Drug Administration, Blood Supply of Eye and Embryology of Eye",
            video_length: "69 Min",
          },
        ],
      },
      {
        topic: "NEURO-OPHTHALMOLOGY - E8",
        subtopics: [
          {
            title: "Visual Pathway and Visual Field Defects",
            video_length: "86 Min",
          },
          {
            title: "Pupillary Reflexes, Light Reflex and its Lesions",
            video_length: "80 Min",
          },
          {
            title:
              "Optic Atrophy: Optic Neuritis, Optic Neuropathies and Papilledema",
            video_length: "74 Min",
          },
          {
            title: "Congenital Anomalies of Optic Disc and Colour Blindness",
            video_length: "30 Min",
          },
        ],
      },
      {
        topic: "SQUINT - E8",
        subtopics: [
          {
            title: "Squint: Extraocular Muscles and Binocular Single Vision",
            video_length: "57 Min",
          },
          {
            title: "Squint: Classifications and Directions",
            video_length: "42 Min",
          },
          { title: "Squint: Investigations", video_length: "69 Min" },
          { title: "Paralytic Squint", video_length: "82 Min" },
          { title: "Gaze Defects", video_length: "33 Min" },
          {
            title: "Restrictive Squint and Comitant Squint",
            video_length: "37 Min",
          },
          {
            title: "Pseudo-strabismus and Ocular Myopathies",
            video_length: "18 Min",
          },
        ],
      },
      {
        topic: "LENS",
        subtopics: [
          { title: "Anatomy and Metabolism", video_length: "50 Min" },
          { title: "Acquired Cataract: Types", video_length: "41 Min" },
          {
            title: "Acquired Cataract: Senile Cataract",
            video_length: "60 Min",
          },
          { title: "Cataract Surgery", video_length: "55 Min" },
          {
            title: "Complications of Cataract Surgery",
            video_length: "52 Min",
          },
          {
            title: "Congenital Cataract, Ectopia lentis and Miscellaneous",
            video_length: "44 Min",
          },
        ],
      },
      {
        topic: "GLAUCOMA",
        subtopics: [
          { title: "Glaucoma: What and How?", video_length: "30 Min" },
          { title: "Investigations for Glaucoma", video_length: "80 Min" },
          { title: "Primary Open Angle Glaucoma", video_length: "86 Min" },
          { title: "Primary Angle Closure Glaucoma", video_length: "45 Min" },
          {
            title: "Secondary Glaucoma(s) and Congenital Glaucoma",
            video_length: "42 Min",
          },
        ],
      },
      {
        topic: "OPTICS - E8",
        subtopics: [
          {
            title: "Tests for Vision and Normal Optics of Eyes",
            video_length: "72 Min",
          },
          { title: "Myopia and Hypermetropia", video_length: "84 Min" },
          {
            title:
              "Astigmatism, Reading of Spectacle Prescription and Binocular Errors",
            video_length: "52 Min",
          },
          {
            title: "Refraction: How to Prescribe Glasses and Aphakia",
            video_length: "86 Min",
          },
        ],
      },
      {
        topic: "RETINA - E8",
        subtopics: [
          {
            title: "Anatomy and Investigations of Retina",
            video_length: "86 Min",
          },
          {
            title: "Retinoblastoma and Macular Disorders",
            video_length: "80 Min",
          },
          {
            title: "Dystrophies of Fundus: Retinitis Pigmentosa and Others",
            video_length: "43 Min",
          },
          {
            title: "Retinal Vascular Disorders: Part 1",
            video_length: "56 Min",
          },
          {
            title: "Retinal Vascular Disorders: Part 2",
            video_length: "56 Min",
          },
          { title: "Retinal Detachment", video_length: "33 Min" },
        ],
      },
      {
        topic: "CORNEA - E8",
        subtopics: [
          {
            title: "Special Investigations for Cornea",
            video_length: "32 Min",
          },
          { title: "Corneal Ulcer and Keratitis", video_length: "61 Min" },
          {
            title:
              "Corneal Dystrophies, Keratoconus and Miscellaneous Disorders",
            video_length: "41 Min",
          },
        ],
      },
      {
        topic: "UVEA - E8",
        subtopics: [
          { title: "Anterior Uveitis", video_length: "72 Min" },
          {
            title:
              "Intermediate, Posterior, Pan-uveitis and Miscellaneous Disorders",
            video_length: "39 Min",
          },
        ],
      },
      {
        topic: "CONJUNCTIVA - E8",
        subtopics: [
          {
            title:
              "Anatomy of Conjunctiva, Types of Conjunctivitis and Pterygium",
            video_length: "78 Min",
          },
        ],
      },
      {
        topic: "ADNEXA - E8",
        subtopics: [
          { title: "Eyelids: Anatomy and Pathologies", video_length: "34 Min" },
          { title: "Anatomy of Orbit and Proptosis", video_length: "62 Min" },
          {
            title: "Lacrimal apparatus: Anatomy, Watering eye and Dry eye",
            video_length: "37 Min",
          },
        ],
      },
      {
        topic: "MISCELLANEOUS - E8",
        subtopics: [
          { title: "Ocular Trauma", video_length: "33 Min" },
          { title: "Community Ophthalmology", video_length: "36 Min" },
          { title: "Lasers in Ophthalmology", video_length: "14 Min" },
          { title: "Physiology of Vision", video_length: "15 Min" },
          { title: "Slit Lamp Oblique Illumination", video_length: "3 Min" },
        ],
      },
    ],
  },
  {
    subject: "ENT",
    topics: [
      {
        topic: "EAR",
        subtopics: [
          { title: "Basics of Ear", video_length: "35 Min" },
          {
            title: "Clinical Embryology and Anatomy of Inner Ear: Part 1",
            video_length: "54 Min",
          },
          {
            title: "Clinical Embryology of External and Middle Ear",
            video_length: "26 Min",
          },
          {
            title: "Clinical Anatomy and Diseases of Pinna",
            video_length: "27 Min",
          },
          {
            title: "Clinical Anatomy and Diseases of External Auditory Canal",
            video_length: "41 Min",
          },
          {
            title: "Clinical Anatomy of Tympanic Membrane and Ossicles",
            video_length: "25 Min",
          },
          {
            title: "Clinical Anatomy of Middle Ear: Part 1",
            video_length: "49 Min",
          },
          {
            title: "Clinical Anatomy of Middle Ear: Part 2",
            video_length: "54 Min",
          },
          {
            title: "Clinical Anatomy of Inner Ear: Part 2",
            video_length: "41 Min",
          },
          { title: "Nerve Supply of Ear", video_length: "24 Min" },
          {
            title: "Audiology and Evaluation: Tuning Fork Tests",
            video_length: "72 Min",
          },
          {
            title: "Audiology and Evaluation: Audiogram (PTA)",
            video_length: "46 Min",
          },
          {
            title: "Audiology - Part 3: Tympanometry and Stapedial Reflex",
            video_length: "43 Min",
          },
          {
            title: "Audiology - Part 4: OAE, ECOG, BERA, and Others",
            video_length: "65 Min",
          },
          { title: "Paediatric Hearing Assessment", video_length: "29 Min" },
          { title: "Conditions of Tympanic Membrane", video_length: "41 Min" },
          { title: "Acute Otitis Media", video_length: "22 Min" },
          { title: "Serous Otitis Media", video_length: "43 Min" },
          { title: "Chronic Mucosal Otitis Media", video_length: "64 Min" },
          { title: "Chronic Squamous Otitis Media", video_length: "63 Min" },
          { title: "Complications of Otitis Media", video_length: "68 Min" },
          { title: "Otosclerosis", video_length: "42 Min" },
          { title: "Vestibular Physiology", video_length: "44 Min" },
          { title: "Vestibular Function Test: Part 1", video_length: "34 Min" },
          { title: "Vestibular Function Test: Part 2", video_length: "37 Min" },
          { title: "BPPV and Vestibular Neuritis", video_length: "18 Min" },
          { title: "Meniere’s Disease", video_length: "49 Min" },
          {
            title:
              "Superior Semicircular Canal Dehiscence and Perilymph Fistula",
            video_length: "22 Min",
          },
          {
            title: "Sudden SNHL, Noise Trauma, Ototoxicity and Presbycusis",
            video_length: "43 Min",
          },
          {
            title: "Tumors of External and Middle Ear",
            video_length: "32 Min",
          },
          { title: "Acoustic Neuroma", video_length: "36 Min" },
          { title: "Facial Nerve: Part 1", video_length: "28 Min" },
          { title: "Facial Nerve: Part 2", video_length: "42 Min" },
          { title: "Hearing Rehabilitation", video_length: "46 Min" },
        ],
      },
      {
        topic: "NOSE",
        subtopics: [
          { title: "Introduction to Nose", video_length: "3 Min" },
          {
            title: "Clinical Anatomy of External Nose and Choanal Atresia",
            video_length: "32 Min",
          },
          {
            title: "Clinical Anatomy of Lateral Wall of Nose",
            video_length: "61 Min",
          },
          {
            title: "Clinical Anatomy and Diseases of Septum",
            video_length: "37 Min",
          },
          {
            title: "Nerve supply of Nose and its Diseases: Part 1",
            video_length: "44 Min",
          },
          {
            title: "Nerve supply of Nose and its Diseases: Part 2",
            video_length: "25 Min",
          },
          {
            title: "Arterial Supply of Nose and Epistaxis",
            video_length: "71 Min",
          },
          {
            title: "Clinical Anatomy of PNS and Rhinosinusitis",
            video_length: "80 Min",
          },
          { title: "Complications of Sinusitis", video_length: "28 Min" },
          { title: "Fungal Sinusitis", video_length: "42 Min" },
          { title: "Nasal Polyps", video_length: "34 Min" },
          {
            title: "Atrophic Rhinitis and Granulomatous Conditions of Nose",
            video_length: "39 Min",
          },
          {
            title: "Fractures of Face and CSF Rhinorrhea",
            video_length: "57 Min",
          },
          { title: "Tumors of Nose and PNS", video_length: "29 Min" },
        ],
      },
      {
        topic: "PHARYNX",
        subtopics: [
          {
            title: "Clinical Anatomy of Pharynx - Part 1: Overview",
            video_length: "23 Min",
          },
          {
            title: "Clinical Anatomy of Pharynx - Part 2: Pharyngeal Wall",
            video_length: "54 Min",
          },
          {
            title: "Clinical Anatomy Of Pharynx - Part 3: Cavity",
            video_length: "80 Min",
          },
          {
            title:
              "Clinical Anatomy of Pharynx - Part 4: Spaces and its Abscess",
            video_length: "92 Min",
          },
          { title: "Adenoid Hypertrophy", video_length: "44 Min" },
          { title: "Angiofibroma", video_length: "32 Min" },
          { title: "Nasopharyngeal Carcinoma", video_length: "24 Min" },
          {
            title: "Conditions of Tonsils and Tonsillectomy",
            video_length: "79 Min",
          },
        ],
      },
      {
        topic: "LARYNX",
        subtopics: [
          {
            title: "Clinical Anatomy of Larynx: Part 1",
            video_length: "75 Min",
          },
          {
            title: "Clinical Anatomy of Larynx: Part 2",
            video_length: "65 Min",
          },
          { title: "Infections of Larynx", video_length: "43 Min" },
          { title: "Congenital Conditions of Larynx", video_length: "44 Min" },
          { title: "Voice Disorders", video_length: "59 Min" },
          {
            title: "Nerve Supply of Larynx and Vocal Cord Palsy",
            video_length: "72 Min",
          },
          { title: "Carcinoma Larynx", video_length: "88 Min" },
          {
            title: "Tracheostomy and Foreign Body in Airways",
            video_length: "51 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Anaesthesia",
    topics: [
      {
        topic: "Anaesthesia",
        subtopics: [
          { title: "Introduction and History", video_length: "22 Min" },
          { title: "Pre Anaesthetic Checkup: Part 1", video_length: "45 Min" },
          { title: "Pre Anaesthetic Checkup: Part 2", video_length: "48 Min" },
          { title: "Pre-operative Preparation", video_length: "44 Min" },
          {
            title: "Monitoring Under Anaesthesia: Part 1",
            video_length: "56 Min",
          },
          {
            title: "Monitoring Under Anaesthesia: Part 2",
            video_length: "62 Min",
          },
          { title: "Anaesthesia Workstation", video_length: "78 Min" },
          { title: "Breathing Systems", video_length: "48 Min" },
          { title: "Regional Anaesthesia", video_length: "62 Min" },
          { title: "Epidural Anaesthesia", video_length: "25 Min" },
          { title: "Peripheral Nerve Blocks", video_length: "47 Min" },
          { title: "Intravenous Anaesthetics", video_length: "78 Min" },
          {
            title: "Inhalational Anaesthetics: Part 1",
            video_length: "53 Min",
          },
          {
            title: "Inhalational Anaesthetics: Part 2",
            video_length: "36 Min",
          },
          { title: "Local Anaesthetics", video_length: "72 Min" },
          { title: "Muscle Relaxants: Part 1", video_length: "47 Min" },
          { title: "Muscle Relaxants: Part 2", video_length: "43 Min" },
          {
            title: "Anaesthesia for Coexisting Diseases",
            video_length: "72 Min",
          },
          { title: "Subspecialty Management", video_length: "32 Min" },
          { title: "Malignant Hyperthermia", video_length: "29 Min" },
          { title: "Day Care Anaesthesia", video_length: "37 Min" },
          { title: "Airway Management", video_length: "86 Min" },
          { title: "Anaesthesia Equipment", video_length: "69 Min" },
          { title: "Basics of Critical Care", video_length: "71 Min" },
          { title: "Mechanical Ventilation: Part 1", video_length: "65 Min" },
          { title: "Mechanical Ventilation: Part 2", video_length: "50 Min" },
          { title: "Cardiopulmonary Resuscitation", video_length: "57 Min" },
        ],
      },
    ],
  },
  {
    subject: "Dermatology",
    topics: [
      {
        topic: "Dermatology",
        subtopics: [
          { title: "Basics in Dermatology: Part 1", video_length: "34 Min" },
          { title: "Basics in Dermatology: Part 2", video_length: "34 Min" },
          { title: "Papulosquamous Diseases: Part 1", video_length: "34 Min" },
          { title: "Papulosquamous Diseases: Part 2", video_length: "19 Min" },
          { title: "Appendages and Disorders: Part 1", video_length: "34 Min" },
          { title: "Appendages and Disorders: Part 2", video_length: "47 Min" },
          { title: "Bullous Disorders: Part 1", video_length: "29 Min" },
          { title: "Bullous Disorders: Part 2", video_length: "38 Min" },
          { title: "Bacterial Infections of Skin", video_length: "35 Min" },
          { title: "Mycobacterial Infections of Skin", video_length: "22 Min" },
          { title: "Viral Infections of Skin", video_length: "42 Min" },
          { title: "Fungal Infections of Skin", video_length: "43 Min" },
          { title: "Parasitic Infections of Skin", video_length: "33 Min" },
          {
            title: "Sexually Transmitted Infections: Part 1",
            video_length: "36 Min",
          },
          {
            title: "Sexually Transmitted Infections: Part 2",
            video_length: "49 Min",
          },
          { title: "Hansen’s Disease: Part 1", video_length: "33 Min" },
          { title: "Hansen’s Disease: Part 2", video_length: "35 Min" },
          { title: "Pigmentary Diseases", video_length: "34 Min" },
          { title: "Eczema", video_length: "37 Min" },
          { title: "Genodermatoses", video_length: "32 Min" },
          { title: "Histamine Related Disorders", video_length: "25 Min" },
          { title: "Cutaneous Drug Reactions", video_length: "25 Min" },
          {
            title: "Skin In Rheumatology and Immunology",
            video_length: "35 Min",
          },
          { title: "Skin and Systems", video_length: "29 Min" },
          { title: "Short Topics in Dermatology", video_length: "31 Min" },
        ],
      },
    ],
  },
  {
    subject: "Psychiatry",
    topics: [
      {
        topic: "Psychiatry",
        subtopics: [
          { title: "Introduction to Psychiatry", video_length: "30 Min" },
          { title: "Psychopathology", video_length: "72 Min" },
          {
            title: "Schizophrenia and Other Psychotic Disorders",
            video_length: "67 Min",
          },
          { title: "Depressive Disorders", video_length: "71 Min" },
          { title: "Bipolar Disorder", video_length: "38 Min" },
          {
            title: "Stress, Trauma and Related Disorders",
            video_length: "32 Min",
          },
          { title: "Anxiety and Related Disorders", video_length: "48 Min" },
          { title: "Obsessive Compulsive Disorder", video_length: "38 Min" },
          { title: "Somatization Disorders", video_length: "57 Min" },
          { title: "Neurocognitive Disorders", video_length: "47 Min" },
          { title: "Eating Disorders", video_length: "24 Min" },
          {
            title: "Sex, Gender and Related Disorders",
            video_length: "49 Min",
          },
          { title: "Sleep and Related Disorders", video_length: "51 Min" },
          {
            title: "Personality and Related Disorders",
            video_length: "33 Min",
          },
          {
            title: "Substance Use and Related Addictive Disorders",
            video_length: "72 Min",
          },
          { title: "Child and Adolescent Psychiatry", video_length: "44 Min" },
          {
            title: "Emergency Psychiatry and Somatic Treatments in Psychiatry",
            video_length: "56 Min",
          },
          { title: "Psychopharmacology", video_length: "40 Min" },
          { title: "Psychology", video_length: "51 Min" },
          {
            title: "Psychological Therapies and Assessments",
            video_length: "44 Min",
          },
          {
            title: "Public Health, Legal Aspects and Other Related Topics",
            video_length: "25 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Radiology",
    topics: [
      {
        topic: "Fundamentals of Radiology",
        subtopics: [
          { title: "X-Ray Fundamentals: Part 1", video_length: "40 Min" },
          { title: "X-Ray Fundamentals: Part 2", video_length: "46 Min" },
          {
            title: "X-Ray Production and Interactions",
            video_length: "27 Min",
          },
          { title: "CT Basics", video_length: "21 Min" },
          { title: "USG Basics", video_length: "41 Min" },
          { title: "MRI Basics", video_length: "28 Min" },
          { title: "Contrast Media", video_length: "51 Min" },
          { title: "USG Interpretation", video_length: "36 Min" },
          { title: "CT Interpretation", video_length: "62 Min" },
        ],
      },
      {
        topic: "Radiotherapy and Nuclear Medicine",
        subtopics: [
          { title: "Radionuclide Imaging: Basics", video_length: "5 Min" },
          { title: "PET Scan", video_length: "28 Min" },
          {
            title: "Systemic Radionuclide Imaging: Part 1",
            video_length: "44 Min",
          },
          {
            title: "Systemic Radionuclide Imaging: Part 2",
            video_length: "36 Min",
          },
          { title: "Radiotherapy", video_length: "88 Min" },
        ],
      },
      {
        topic: "Systemic Radiology - E8",
        subtopics: [
          { title: "CXR Interpretation: Part 1", video_length: "48 Min" },
          { title: "CXR Interpretation: Part 2", video_length: "59 Min" },
          { title: "Silhouette Sign: Basics", video_length: "38 Min" },
          { title: "Silhouette Sign: Applications", video_length: "50 Min" },
          { title: "Pleural Abnormalities", video_length: "71 Min" },
          { title: "Mediastinum and Lung Tumours", video_length: "44 Min" },
          { title: "Congenital Heart Disease", video_length: "25 Min" },
          { title: "Acquired Cardiac Disease", video_length: "60 Min" },
          { title: "Structural Anatomy of Brain", video_length: "27 Min" },
          { title: "Basics of Neuroimaging", video_length: "38 Min" },
          { title: "Stroke Imaging", video_length: "57 Min" },
          { title: "Head Trauma Imaging", video_length: "61 Min" },
          { title: "Brain Tumors", video_length: "39 Min" },
          { title: "CNS Infections and Miscellaneous", video_length: "35 Min" },
          { title: "Conventional Procedures in GUT", video_length: "46 Min" },
          { title: "GUT Imaging", video_length: "60 Min" },
          { title: "Renal Papillary Necrosis Imaging", video_length: "9 Min" },
          { title: "Conventional Procedures in GIT", video_length: "44 Min" },
          { title: "GIT Imaging", video_length: "61 Min" },
          { title: "Hydatid Cyst Imaging", video_length: "12 Min" },
          { title: "Hepatobiliary Imaging", video_length: "54 Min" },
          {
            title: "Obstetrics and Gynaecology Imaging",
            video_length: "33 Min",
          },
          { title: "Breast Imaging", video_length: "35 Min" },
          { title: "Arthritis and Bone Infections", video_length: "53 Min" },
          { title: "Systemic Bone Disorders", video_length: "39 Min" },
          { title: "Bone Tumours", video_length: "34 Min" },
          { title: "Musculoskeletal Trauma Imaging", video_length: "50 Min" },
        ],
      },
    ],
  },
  {
    subject: "Surgery",
    topics: [
      {
        topic: "General Surgery",
        subtopics: [
          {
            title: "Patient Safety, OT Zones and Surgery Positions",
            video_length: "48 Min",
          },
          {
            title: "Surgical Blades and Energy Sources",
            video_length: "31 Min",
          },
          {
            title: "Surgical Drains, Knots and Sutures",
            video_length: "64 Min",
          },
          {
            title: "Post-operative Fever and Wound Infection",
            video_length: "61 Min",
          },
          {
            title: "Day Care Surgery",
            video_length: "26 Min",
          },
          {
            title: "Surgical Nutrition",
            video_length: "50 Min",
          },
          {
            title: "Shock: Part 1",
            video_length: "63 Min",
          },
          {
            title: "Shock: Part 2",
            video_length: "37 Min",
          },
          {
            title: "General Surgery: Clinical Scenarios",
            video_length: "16 Min",
          },
        ],
      },
      {
        topic: "Breast",
        subtopics: [
          {
            title: "Breast: Part 1",
            video_length: "55 Min",
          },
          {
            title: "Breast: Part 2",
            video_length: "58 Min",
          },
          {
            title: "Breast: Part 3",
            video_length: "60 Min",
          },
          {
            title: "Breast: Part 4",
            video_length: "58 Min",
          },
          {
            title: "Clinical Case Discussion: Breast",
            video_length: "17 Min",
          },
          {
            title: "Breast: Part 5",
            video_length: "55 Min",
          },
        ],
      },
      {
        topic: "Endocrine System",
        subtopics: [
          {
            title: "Thyroid: Part 1",
            video_length: "63 Min",
          },
          {
            title: "Thyroid: Part 2",
            video_length: "71 Min",
          },
          {
            title: "Thyroid: Part 3",
            video_length: "62 Min",
          },
          {
            title: "Clinical Case Discussion: Neck swelling",
            video_length: "16 Min",
          },
          {
            title: "Parathyroid",
            video_length: "42 Min",
          },
          {
            title: "Adrenal Glands and Neuroendocrine Tumors",
            video_length: "40 Min",
          },
        ],
      },
      {
        topic: "Gastrointestinal & Abdominal Surgery",
        subtopics: [
          {
            title: "Esophagus: Part 1",
            video_length: "82 Min",
          },
          {
            title: "Esophagus: Part 2",
            video_length: "69 Min",
          },
          {
            title: "Esophagus: Part 3",
            video_length: "36 Min",
          },
          {
            title: "Stomach: Part 1",
            video_length: "47 Min",
          },
          {
            title: "Stomach: Part 2",
            video_length: "43 Min",
          },
          {
            title: "Stomach: Part 3",
            video_length: "61 Min",
          },
          {
            title: "Upper GI Hemorrhage",
            video_length: "48 Min",
          },
          {
            title: "Bariatric Surgery",
            video_length: "45 Min",
          },
          {
            title: "Bariatric Surgery",
            video_length: "46 Min",
          },
          {
            title: "Bowel Obstruction: Part 1",
            video_length: "61 Min",
          },
          {
            title: "Bowel Obstruction: Part 2",
            video_length: "65 Min",
          },
          {
            title: "Benign Conditions of Small and Large Bowel",
            video_length: "71 Min",
          },
          {
            title: "Appendix",
            video_length: "72 Min",
          },
          {
            title: "Colorectal Polyps and Cancer: Part 1",
            video_length: "49 Min",
          },
          {
            title: "Colorectal Polyps and Cancer: Part 2",
            video_length: "36 Min",
          },
          {
            title: "Rectum and Anal Canal",
            video_length: "72 Min",
          },
          {
            title: "Liver: Part 1",
            video_length: "44 Min",
          },
          {
            title: "Liver: Part 2",
            video_length: "53 Min",
          },
          {
            title: "Spleen",
            video_length: "33 Min",
          },
          {
            title: "Gall Bladder and Bile Ducts: Part 1",
            video_length: "74 Min",
          },
          {
            title: "Gall Bladder and Bile Ducts: Part 2",
            video_length: "65 Min",
          },
          {
            title: "Benign Pancreatic Conditions",
            video_length: "67 Min",
          },
          {
            title: "Pancreatic Tumors",
            video_length: "64 Min",
          },
          {
            title: "Clinical Case Discussion: Abdominal lump",
            video_length: "30 Min",
          },
          {
            title: "GIT: Clinical Scenarios",
            video_length: "37 Min",
          },
        ],
      },
      {
        topic: "Urology",
        subtopics: [
          {
            title: "Testicular Disorders: Part 1",
            video_length: "52 Min",
          },
          {
            title: "Testicular Disorders: Part 2",
            video_length: "37 Min",
          },
          {
            title: "Clinical Case Discussion: Scrotal swelling",
            video_length: "10 Min",
          },
          {
            title: "Urethral and Penile Disorders",
            video_length: "53 Min",
          },
          {
            title: "Kidney: Part 1",
            video_length: "76 Min",
          },
          {
            title: "Kidney: Part 2",
            video_length: "73 Min",
          },
          {
            title: "Bladder",
            video_length: "40 Min",
          },
          {
            title: "Prostate: Part 1",
            video_length: "35 Min",
          },
          {
            title: "Prostate: Part 2",
            video_length: "51 Min",
          },
          {
            title: "Urology: Clinical Scenarios",
            video_length: "21 Min",
          },
        ],
      },
      {
        topic: "Speciality Surgery",
        subtopics: [
          {
            title: "Minimally Invasive Surgery",
            video_length: "42 Min",
          },
          {
            title: "Transplant Surgery",
            video_length: "46 Min",
          },
          {
            title: "Plastic Surgery: Part 1",
            video_length: "48 Min",
          },
          {
            title: "Plastic Surgery: Part 2",
            video_length: "41 Min",
          },
          {
            title: "Neurosurgery",
            video_length: "56 Min",
          },
        ],
      },
      {
        topic: "Trauma",
        subtopics: [
          {
            title: "Basics of Trauma Management",
            video_length: "59 Min",
          },
          {
            title: "Abdominal Trauma",
            video_length: "72 Min",
          },
          {
            title: "Thoracic Trauma",
            video_length: "69 Min",
          },
          {
            title: "Head Trauma",
            video_length: "73 Min",
          },
          {
            title: "Thermal Injuries",
            video_length: "63 Min",
          },
          {
            title: "Trauma: Clinical Scenarios",
            video_length: "21 Min",
          },
        ],
      },
      {
        topic: "Hernia",
        subtopics: [
          {
            title: "Clinical Case Discussion: Inguinoscrotal Swelling",
            video_length: "20 Min",
          },
          {
            title: "Hernia: Part 1",
            video_length: "71 Min",
          },
          {
            title: "Hernia: Part 2",
            video_length: "58 Min",
          },
        ],
      },
      {
        topic: "Vascular Surgery",
        subtopics: [
          {
            title: "Venous Thrombosis",
            video_length: "39 Min",
          },
          {
            title: "Varicose Veins",
            video_length: "50 Min",
          },
          {
            title: "Arterial System: Part 1",
            video_length: "50 Min",
          },
          {
            title: "Arterial System: Part 2",
            video_length: "50 Min",
          },
          {
            title: "Lymphatic System",
            video_length: "40 Min",
          },
          {
            title: "Vascular Surgery: Clinical Scenarios",
            video_length: "15 Min",
          },
        ],
      },
      {
        topic: "Faciomaxillary Surgery",
        subtopics: [
          {
            title: "Oral Cancers",
            video_length: "69 Min",
          },
          {
            title: "Clinical Case Discussion: Oral lesion",
            video_length: "13 Min",
          },
          {
            title: "Salivary Glands",
            video_length: "67 Min",
          },
        ],
      },
      {
        topic: "Miscellaneous",
        subtopics: [
          {
            title: "Skin Tumors and Soft Tissue Sarcomas",
            video_length: "35 Min",
          },
          {
            title: "Thorax and Mediastinum",
            video_length: "45 Min",
          },
          {
            title: "Common Surgical Swellings",
            video_length: "29 Min",
          },
          {
            title: "Common Ulcers",
            video_length: "25 Min",
          },
          {
            title: "Surgical Instruments",
            video_length: "40 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Orthopaedics",
    topics: [
      {
        topic: "VIDEOS",
        subtopics: [
          {
            title: "Basic Anatomy and Physiology of Bone",
            video_length: "28 Min",
          },
          {
            title: "Basic Terminology of Fracture and Healing",
            video_length: "72 Min",
          },
          {
            title: "Open Fracture, Amputations and Polytrauma",
            video_length: "46 Min",
          },
          {
            title: "Metabolic Disorders of Bone",
            video_length: "78 Min",
          },
          {
            title: "Upper Limb Trauma: Clavicle and Shoulder",
            video_length: "36 Min",
          },
          {
            title: "Upper Limb Trauma: Arm and Elbow",
            video_length: "70 Min",
          },
          {
            title: "Upper Limb Trauma: Forearm, Wrist and Hand",
            video_length: "48 Min",
          },
          {
            title: "Lower Limb Trauma: Pelvis and Tests",
            video_length: "49 Min",
          },
          {
            title: "Lower Limb Trauma: Hip Dislocation and Fractures",
            video_length: "47 Min",
          },
          {
            title: "Lower Limb Trauma: Femur, Knee, Leg and Foot",
            video_length: "32 Min",
          },
          {
            title: "Sports Injuries Around Knee",
            video_length: "60 Min",
          },
          {
            title: "Painful Regional Conditions and AVN",
            video_length: "94 Min",
          },
          {
            title: "Nerve Injuries: Part 1",
            video_length: "45 Min",
          },
          {
            title: "Nerve injuries: Part 2",
            video_length: "70 Min",
          },
          {
            title: "Orthopaedic Oncology: Part 1",
            video_length: "47 Min",
          },
          {
            title: "Orthopaedic Oncology: Part 2",
            video_length: "53 Min",
          },
          {
            title: "Infection of Bone and Joints",
            video_length: "73 Min",
          },
          {
            title: "Tuberculosis of Bone and Joints",
            video_length: "40 Min",
          },
          {
            title: "Paediatric Orthopaedics: Trauma, Neck and Upper Limb",
            video_length: "37 Min",
          },
          {
            title: "Paediatric Orthopaedics: Hip",
            video_length: "39 Min",
          },
          {
            title: "Paediatric Orthopaedics: Knee and Foot",
            video_length: "36 Min",
          },
          {
            title: "Spine: General and Trauma",
            video_length: "54 Min",
          },
          {
            title: "Spine: Disorders",
            video_length: "47 Min",
          },
          {
            title: "Joint Disorders",
            video_length: "57 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Paediatrics",
    topics: [
      {
        topic: "NEONATOLOGY",
        subtopics: [
          {
            title: "Normal Newborn",
            video_length: "72 Min",
          },
          {
            title: "Neonatal Resuscitation",
            video_length: "40 Min",
          },
          {
            title: "Necrotizing Enterocolitis and Neonatal Sepsis",
            video_length: "45 Min",
          },
          {
            title: "Respiratory Distress in Newborn",
            video_length: "55 Min",
          },
          {
            title: "Neonatal Jaundice",
            video_length: "46 Min",
          },
          {
            title: "Neonatal Hypothermia and Neonatal Hypoglycemia",
            video_length: "41 Min",
          },
          {
            title: "Neonatal Reflexes, HIE and Neonatal Seizures",
            video_length: "56 Min",
          },
        ],
      },
      {
        topic: "GROWTH AND DEVELOPMENT",
        subtopics: [
          {
            title: "Normal Growth",
            video_length: "55 Min",
          },
          {
            title: "Abnormalities of Head Size and Shape",
            video_length: "37 Min",
          },
          {
            title: "Abnormalities of Stature",
            video_length: "27 Min",
          },
          {
            title: "Normal development",
            video_length: "53 Min",
          },
          {
            title: "Disorders of development",
            video_length: "18 Min",
          },
          {
            title: "Behavioural Disorders in Children",
            video_length: "37 Min",
          },
        ],
      },
      {
        topic: "NUTRITION",
        subtopics: [
          {
            title: "Breastfeeding",
            video_length: "34 Min",
          },
          {
            title: "Malnutrition",
            video_length: "45 Min",
          },
          {
            title: "Obesity",
            video_length: "28 Min",
          },
          {
            title: "Rickets and Scurvy",
            video_length: "43 Min",
          },
        ],
      },
      {
        topic: "GENETIC DISORDERS",
        subtopics: [
          {
            title: "Genetic Disorders",
            video_length: "63 Min",
          },
        ],
      },
      {
        topic: "CHILDHOOD INFECTIONS",
        subtopics: [
          {
            title: "Childhood Infections",
            video_length: "58 Min",
          },
          {
            title: "TORCH Infections",
            video_length: "45 Min",
          },
          {
            title: "COVID-19 in children",
            video_length: "28 Min",
          },
        ],
      },
      {
        topic: "GASTROINTESTINAL SYSTEM",
        subtopics: [
          {
            title: "Disorders of Esophagus in Children",
            video_length: "25 Min",
          },
          {
            title: "Diarrheal Disorders in Children",
            video_length: "45 Min",
          },
          {
            title: "Disorders of Liver in Children",
            video_length: "72 Min",
          },
          {
            title: "Surgical GI Disorders in Children",
            video_length: "43 Min",
          },
        ],
      },
      {
        topic: "RESPIRATORY SYSTEM",
        subtopics: [
          {
            title: "Asthma",
            video_length: "36 Min",
          },
          {
            title: "Respiratory Infections",
            video_length: "48 Min",
          },
          {
            title: "Cystic Fibrosis",
            video_length: "29 Min",
          },
        ],
      },
      {
        topic: "CARDIOVASCULAR SYSTEM",
        subtopics: [
          {
            title:
              "Fetal Circulation and Introduction to Congenital Heart Diseases",
            video_length: "29 Min",
          },
          {
            title: "Acyanotic Congenital Heart Defects",
            video_length: "60 Min",
          },
          {
            title: "Cyanotic Congenital Heart Defects",
            video_length: "62 Min",
          },
          {
            title: "Acute Rheumatic Fever",
            video_length: "38 Min",
          },
        ],
      },
      {
        topic: "GENITO-URINARY SYSTEM",
        subtopics: [
          {
            title: "Congenital Anomalies of Kidney and Urinary Tract",
            video_length: "34 Min",
          },
          {
            title: "Nephrotic and Nephritic Syndrome",
            video_length: "49 Min",
          },
          {
            title: "Inherited Tubular Disorders",
            video_length: "32 Min",
          },
          {
            title: "Acute Kidney Injury and Chronic Kidney Disease",
            video_length: "44 Min",
          },
          {
            title: "VUR and UTI Management guidelines",
            video_length: "36 Min",
          },
        ],
      },
      {
        topic: "NERVOUS SYSTEM - E8",
        subtopics: [
          {
            title: "Congenital Anomalies and Hydrocephalus",
            video_length: "64 Min",
          },
          {
            title: "Seizure Disorders",
            video_length: "48 Min",
          },
          {
            title: "Cerebral Palsy and CNS Infections",
            video_length: "58 Min",
          },
          {
            title: "Neuromuscular Disorders",
            video_length: "47 Min",
          },
        ],
      },
      {
        topic: "ENDOCRINE SYSTEM",
        subtopics: [
          {
            title: "Growth Hormone Deficiency and Hypothyroidism",
            video_length: "42 Min",
          },
          {
            title: "Adrenal Disorders in Children",
            video_length: "43 Min",
          },
          {
            title: "Pubertal Disorders",
            video_length: "31 Min",
          },
          {
            title: "Diabetic Ketoacidosis",
            video_length: "21 Min",
          },
        ],
      },
      {
        topic: "CHILDHOOD MALIGNANCIES",
        subtopics: [
          {
            title: "Hematological Malignancies",
            video_length: "71 Min",
          },
          {
            title: "Solid Tumors in Children",
            video_length: "35 Min",
          },
        ],
      },
      {
        topic: "PAEDIATRIC RHEUMATOLOGY",
        subtopics: [
          {
            title: "Rheumatic Diseases of Childhood",
            video_length: "73 Min",
          },
        ],
      },
      {
        topic: "HEMATOLOGY",
        subtopics: [
          {
            title: "Approach to Anemia in Children and Nutritional Anemia",
            video_length: "62 Min",
          },
          {
            title: "Congenital Hemolytic Anemia",
            video_length: "65 Min",
          },
          {
            title: "Bleeding Disorders",
            video_length: "43 Min",
          },
        ],
      },
      {
        topic: "MISCELLANEOUS",
        subtopics: [
          {
            title: "Pediatric Resuscitation",
            video_length: "34 Min",
          },
          {
            title: "Shock",
            video_length: "41 Min",
          },
        ],
      },
    ],
  },

  {
    subject: "Obstetrics & Gynaecology",
    topics: [
      {
        topic: "GENERAL GYNAECOLOGY",
        subtopics: [
          {
            title: "Applied Anatomy: Introduction and Uterine Artery",
            video_length: "52 Min",
          },
          {
            title: "Applied Anatomy: Fallopian Tubes, Ovary and Uterus",
            video_length: "52 Min",
          },
          {
            title: "Applied Anatomy: Cervix and Vagina",
            video_length: "41 Min",
          },
          { title: "Types of Hysterectomy", video_length: "33 Min" },
          {
            title: "Applied Anatomy: External Genitalia",
            video_length: "31 Min",
          },
          { title: "Vulval Cancer", video_length: "48 Min" },
          {
            title: "Investigations in Gynaecology: Hysteroscopy and HSG",
            video_length: "52 Min",
          },
          {
            title: "Development of Female Internal Genitalia",
            video_length: "94 Min",
          },
          {
            title: "Development of Vagina and Transverse Vaginal Septum",
            video_length: "41 Min",
          },
          { title: "Menstrual Cycle", video_length: "100 Min" },
          { title: "Hormones in Gynaecology: Part 1", video_length: "35 Min" },
          { title: "Hormones in Gynaecology: Part 2", video_length: "85 Min" },
          {
            title: "Characteristics of Normal Menstrual Cycle",
            video_length: "15 Min",
          },
          { title: "Atypical Uterine Bleeding", video_length: "79 Min" },
          { title: "Puberty and Precocious Puberty", video_length: "74 Min" },
          { title: "Menopause", video_length: "46 Min" },
          { title: "Hormone Replacement Therapy", video_length: "22 Min" },
          { title: "Hirsutism", video_length: "28 Min" },
          { title: "PCOS: Part 1", video_length: "75 Min" },
          { title: "PCOS: Part 2", video_length: "61 Min" },
          { title: "Asherman Syndrome", video_length: "20 Min" },
          { title: "Secondary Amenorrhea", video_length: "56 Min" },
          { title: "Dysmenorrhea and Pelvic Pain", video_length: "11 Min" },
          { title: "Endometriosis", video_length: "60 Min" },
          {
            title: "Comparison of Fibroid, Polyp and Adenomyosis",
            video_length: "65 Min",
          },
          { title: "Fibroid", video_length: "51 Min" },
          { title: "Prolapse: Part 1", video_length: "72 Min" },
          { title: "Prolapse: Part 2", video_length: "58 Min" },
          { title: "Normal Sexual Development", video_length: "59 Min" },
          {
            title: "Disorders of Sexual Development (46 XX)",
            video_length: "51 Min",
          },
          {
            title: "Disorders of Sexual Development (46 XY)",
            video_length: "54 Min",
          },
          { title: "Primary Amenorrhea", video_length: "60 Min" },
        ],
      },
      {
        topic: "GYNAECOLOGIC INFECTIONS",
        subtopics: [
          { title: "Vaginitis and Cervicitis", video_length: "41 Min" },
          { title: "Pelvic Inflammatory Disease", video_length: "38 Min" },
          { title: "Genital tuberculosis", video_length: "26 Min" },
        ],
      },
      {
        topic: "INFERTILITY AND CONTRACEPTION - E8",
        subtopics: [
          { title: "Female Infertility: Part 1", video_length: "49 Min" },
          { title: "Female Infertility: Part 2", video_length: "46 Min" },
          { title: "Male Infertility", video_length: "97 Min" },
          { title: "Contraception: Part 1", video_length: "73 Min" },
          { title: "Contraception: Part 2", video_length: "48 Min" },
          { title: "Contraception: Images", video_length: "42 Min" },
        ],
      },
      {
        topic: "GYNAECOLOGIC ONCOLOGY",
        subtopics: [
          { title: "Endometrial Hyperplasia", video_length: "32 Min" },
          { title: "Endometrial Cancer", video_length: "55 Min" },
          { title: "CIN: Part 1", video_length: "89 Min" },
          { title: "CIN: Part 2", video_length: "48 Min" },
          { title: "Cancer Cervix", video_length: "53 Min" },
          { title: "Ovarian cancer: Part 1", video_length: "82 Min" },
          { title: "Ovarian cancer: Part 2", video_length: "36 Min" },
          {
            title: "Gynaecology: Miscellaneous Topics",
            video_length: "51 Min",
          },
        ],
      },
      {
        topic: "FUNDAMENTALS OF REPRODUCTION - E8",
        subtopics: [
          { title: "Gametogenesis", video_length: "30 Min" },
          { title: "Fertilization and Implantation", video_length: "80 Min" },
          { title: "Teratogenic Exposure of Fetus", video_length: "37 Min" },
          { title: "Placenta", video_length: "46 Min" },
          { title: "Placental Hormones and Functions", video_length: "66 Min" },
          { title: "Placental Anomalies", video_length: "55 Min" },
          { title: "Amniotic Fluid", video_length: "65 Min" },
        ],
      },
      {
        topic: "NORMAL PREGNANCY AND ANTENATAL CARE - E8",
        subtopics: [
          { title: "Basics of Pregnancy: Part 1", video_length: "54 Min" },
          { title: "Basics of Pregnancy: Part 2", video_length: "56 Min" },
          {
            title: "Umbilical Cord and Doppler in Pregnancy",
            video_length: "37 Min",
          },
          { title: "Antenatal Care", video_length: "63 Min" },
          { title: "Ultrasound in Pregnancy: Part 1", video_length: "65 Min" },
          { title: "Ultrasound in Pregnancy: Part 2", video_length: "40 Min" },
          { title: "Aneuploidy Screening", video_length: "73 Min" },
          { title: "Antepartum Fetal Monitoring", video_length: "46 Min" },
          { title: "Intrapartum Fetal Monitoring", video_length: "72 Min" },
        ],
      },
      {
        topic: "MEDICAL AND SURGICAL COMPLICATIONS IN PREGNANCY - E8",
        subtopics: [
          {
            title: "Maternal Adaptations in Pregnancy",
            video_length: "70 Min",
          },
          { title: "Anemia in Pregnancy: Part 1", video_length: "58 Min" },
          { title: "Anemia in Pregnancy: Part 2", video_length: "34 Min" },
          { title: "Drugs in Pregnancy", video_length: "22 Min" },
          { title: "Heart Diseases in Pregnancy", video_length: "66 Min" },
          { title: "Thyroid Disorders in Pregnancy", video_length: "8 Min" },
          { title: "Diabetes in Pregnancy: Part 1", video_length: "64 Min" },
          { title: "Diabetes in Pregnancy: Part 2", video_length: "37 Min" },
          { title: "Diabetes in Pregnancy: Part 3", video_length: "48 Min" },
          {
            title: "Pregnancy-Induced Hypertension: Part 1",
            video_length: "47 Min",
          },
          {
            title: "Pregnancy-Induced Hypertension: Part 2",
            video_length: "58 Min",
          },
          {
            title: "Pregnancy-Induced Hypertension: Part 3",
            video_length: "71 Min",
          },
          { title: "Liver Disorders in Pregnancy", video_length: "37 Min" },
          { title: "Rh Negative Pregnancy", video_length: "75 Min" },
        ],
      },
      {
        topic: "OBSTETRIC COMPLICATIONS - E8",
        subtopics: [
          { title: "Abortion: Part 1", video_length: "66 Min" },
          { title: "Abortion: Part 2", video_length: "27 Min" },
          { title: "Medical Termination of Pregnancy", video_length: "64 Min" },
          { title: "Ectopic Pregnancy: Part 1", video_length: "45 Min" },
          { title: "Ectopic Pregnancy: Part 2", video_length: "46 Min" },
          {
            title: "Gestational Trophoblastic Disease",
            video_length: "71 Min",
          },
          { title: "Antepartum Hemorrhage: Part 1", video_length: "81 Min" },
          { title: "Antepartum Hemorrhage: Part 2", video_length: "44 Min" },
          { title: "Placenta Accreta Spectrum", video_length: "19 Min" },
          { title: "Twin Pregnancy: Part 1", video_length: "50 Min" },
          { title: "Twin Pregnancy: Part 2", video_length: "61 Min" },
          { title: "Preterm Labor", video_length: "73 Min" },
          { title: "Premature Rupture of Membranes", video_length: "39 Min" },
          {
            title: "Post-Term Pregnancy and Macrosomia",
            video_length: "30 Min",
          },
        ],
      },
      {
        topic: "LABOR AND PUERPERIUM - E8",
        subtopics: [
          { title: "Maternal Pelvis", video_length: "69 Min" },
          {
            title: "Contracted Pelvis, CPD and Types of Pelvis",
            video_length: "20 Min",
          },
          { title: "Fetal Skull", video_length: "40 Min" },
          { title: "Terminology related to Labor", video_length: "73 Min" },
          {
            title: "Stages of Labor: Normal and Abnormal",
            video_length: "69 Min",
          },
          { title: "Partogram", video_length: "60 Min" },
          { title: "Normal Labor", video_length: "73 Min" },
          { title: "Induction of Labor", video_length: "41 Min" },
          {
            title: "Active Management of Third Stage of Labor",
            video_length: "50 Min",
          },
          { title: "Postpartum Hemorrhage", video_length: "71 Min" },
          {
            title: "Other Complications of Third Stage of Labor",
            video_length: "63 Min",
          },
          {
            title: "Vulval hematoma, Perineal Tear and Episiotomy",
            video_length: "35 Min",
          },
          { title: "Malpresentation: Part 1", video_length: "76 Min" },
          { title: "Malpresentation: Part 2", video_length: "67 Min" },
          { title: "Instrumental Delivery", video_length: "70 Min" },
          { title: "Cesarean Section", video_length: "45 Min" },
          { title: "Puerperium", video_length: "40 Min" },
        ],
      },
    ],
  },
  {
    subject: "Medicine",
    topics: [
      {
        topic: "GASTROENTEROLOGY - E8",
        subtopics: [
          { title: "Introduction to GIT", video_length: "13 Min" },
          { title: "Diarrhea", video_length: "40 Min" },
          {
            title: "Physiology of GIT Absorption and Selective Malabsorption",
            video_length: "54 Min",
          },
          {
            title: "Clinical Features And Tests For Malabsorption",
            video_length: "23 Min",
          },
          { title: "Global Malabsorption", video_length: "64 Min" },
          {
            title: "Inflammatory Bowel Disease: Part 1",
            video_length: "54 Min",
          },
          {
            title: "Inflammatory Bowel Disease: Part 2",
            video_length: "59 Min",
          },
          { title: "Infectious Diarrhoea", video_length: "30 Min" },
          { title: "Stomach", video_length: "46 Min" },
          { title: "Gastrinoma", video_length: "12 Min" },
          { title: "Irritable Bowel Syndrome", video_length: "18 Min" },
        ],
      },
      {
        topic: "HEMATOLOGY - E8",
        subtopics: [
          {
            title: "Introduction to Clinical Hematology",
            video_length: "13 Min",
          },
          { title: "Clinical Approach to Anemia", video_length: "33 Min" },
          { title: "Iron Metabolism", video_length: "66 Min" },
          {
            title: "Approach to Microcytic Hypochromic Anemia",
            video_length: "25 Min",
          },
          { title: "Macrocytic Anemia", video_length: "45 Min" },
          { title: "Approach to Hemolysis", video_length: "25 Min" },
          { title: "Immune Mediated Hemolytic Anemia", video_length: "51 Min" },
          {
            title: "Non-Immune Mediated Hemolytic Anemia",
            video_length: "42 Min",
          },
          { title: "Hemolytic Anemia: Miscellaneous", video_length: "31 Min" },
          {
            title: "Myeloproliferative Neoplasms: Part 1",
            video_length: "56 Min",
          },
          {
            title: "Myeloproliferative Neoplasms: Part 2",
            video_length: "51 Min",
          },
          { title: "Bone Marrow Failure Syndromes", video_length: "34 Min" },
          { title: "Acute Leukemia", video_length: "77 Min" },
          {
            title: "Acute Myeloid Leukemia V/S Acute Lymphoblastic Leukemia",
            video_length: "19 Min",
          },
          { title: "World of Lymphomas", video_length: "20 Min" },
          { title: "Chronic Lymphocytic Leukemia", video_length: "22 Min" },
          { title: "Non-Hodgkin’s Lymphoma", video_length: "36 Min" },
          { title: "Hodgkin’s Disease", video_length: "43 Min" },
          { title: "Hodgkin’s Disease", video_length: "42 Min" },
          { title: "Plasma Cell Disorders", video_length: "68 Min" },
          { title: "Platelets: Basics", video_length: "25 Min" },
          { title: "Approach to Bleeding Disorders", video_length: "69 Min" },
        ],
      },
      {
        topic: "PULMONOLOGY - E8",
        subtopics: [
          { title: "Clinical Anatomy of Lungs", video_length: "48 Min" },
          { title: "Clinical Physiology of Lungs", video_length: "38 Min" },
          { title: "Pulmonary Function Tests", video_length: "72 Min" },
          { title: "Venous Thromboembolism", video_length: "38 Min" },
          { title: "Pulmonary Hypertension", video_length: "26 Min" },
          { title: "Bronchiectasis", video_length: "34 Min" },
          { title: "Occupational Lung Diseases", video_length: "41 Min" },
          {
            title:
              "Respiratory Failure and Acute Respiratory Distress Syndrome",
            video_length: "51 Min",
          },
          { title: "Interstitial Lung Disease", video_length: "46 Min" },
          { title: "Bronchial Asthma", video_length: "30 Min" },
          { title: "Pulmonary Eosinophilia", video_length: "36 Min" },
          {
            title: "Allergic Bronchopulmonary Aspergillosis",
            video_length: "19 Min",
          },
          { title: "Hypersensitivity Pneumonitis", video_length: "20 Min" },
          { title: "Pleural Effusion", video_length: "29 Min" },
          { title: "Obstructive Sleep Apnea Syndrome", video_length: "16 Min" },
          {
            title: "Chronic Obstructive Pulmonary Disease",
            video_length: "38 Min",
          },
          { title: "Community Acquired Pneumonia", video_length: "71 Min" },
          {
            title: "Atypical Pneumonia and Pneumonia in Immunocompromised",
            video_length: "34 Min",
          },
        ],
      },
      {
        topic: "CARDIOLOGY - E8",
        subtopics: [
          { title: "Introduction to Cardiology", video_length: "10 Min" },
          { title: "Cardiac Cycle with Heart Sounds", video_length: "76 Min" },
          { title: "Added Heart Sounds", video_length: "39 Min" },
          { title: "Aortic Stenosis", video_length: "50 Min" },
          { title: "Aortic Regurgitation", video_length: "38 Min" },
          { title: "Heart Failure", video_length: "63 Min" },
          {
            title: "Acute Decompensated Heart Failure",
            video_length: "34 Min",
          },
          { title: "Cardiomyopathy: Part 1", video_length: "31 Min" },
          { title: "Cardiomyopathy: Part 2", video_length: "64 Min" },
          { title: "Mitral Regurgitation", video_length: "52 Min" },
          { title: "Mitral Stenosis", video_length: "46 Min" },
          {
            title: "CCP, CT, RCM and Acute Pericarditis",
            video_length: "58 Min",
          },
          { title: "Pulse", video_length: "39 Min" },
          { title: "Jugular Venous Pulse (JVP)", video_length: "33 Min" },
        ],
      },
      {
        topic: "ECG",
        subtopics: [
          { title: "Introduction to ECG", video_length: "83 Min" },
          {
            title: "Approach to Hypertrophy and Blocks",
            video_length: "58 Min",
          },
          { title: "SA Nodal Dysfunction", video_length: "53 Min" },
          { title: "AV blocks", video_length: "50 Min" },
          { title: "Tachyarrhythmias", video_length: "101 Min" },
          { title: "Atrial Fibrillation and Flutter", video_length: "49 Min" },
          { title: "Ventricular Arrhythmias", video_length: "56 Min" },
          { title: "WPW Syndrome", video_length: "15 Min" },
        ],
      },
      {
        topic: "ACS",
        subtopics: [
          { title: "Introduction to ACS", video_length: "97 Min" },
          { title: "ACS: Coronary Circulation", video_length: "67 Min" },
          { title: "ACS: Evaluation and Management", video_length: "102 Min" },
        ],
      },
      {
        topic: "RHEUMATOLOGY AND IMMUNOLOGY - E8",
        subtopics: [
          { title: "Introduction to Rheumatology", video_length: "9 Min" },
          { title: "Sjogren’s Syndrome", video_length: "63 Min" },
          { title: "IgG4 Related Disease", video_length: "26 Min" },
          { title: "SLE: Basic Approach", video_length: "26 Min" },
          { title: "SLE: Diagnosis", video_length: "32 Min" },
          {
            title: "SLE: Clinical Profile and Management",
            video_length: "65 Min",
          },
          { title: "Antiphospholipid Syndrome", video_length: "37 Min" },
          { title: "Systemic Sclerosis", video_length: "47 Min" },
          { title: "Inflammatory Muscle Diseases", video_length: "47 Min" },
          {
            title: "Sarcoidosis and Mixed Connective Tissue Disease",
            video_length: "46 Min",
          },
          {
            title: "Classification of Vasculitis and Large Vessel Vasculitis",
            video_length: "50 Min",
          },
          { title: "Small Vessel Vasculitis", video_length: "60 Min" },
          {
            title: "Henoch-Schonlein Purpura V/S Cryoglobulinemia",
            video_length: "24 Min",
          },
          { title: "Variable Vessel Vasculitis", video_length: "25 Min" },
          { title: "Basic Approach to Arthritis", video_length: "30 Min" },
          { title: "Rheumatoid Arthritis", video_length: "82 Min" },
          { title: "Spondyloarthritis", video_length: "69 Min" },
          { title: "Crystal Arthropathies", video_length: "51 Min" },
          {
            title: "Adult-Onset Still’s Disease and Septic Arthritis",
            video_length: "14 Min",
          },
        ],
      },
      {
        topic: "NEUROLOGY - E8",
        subtopics: [
          { title: "Introduction to Neurology", video_length: "11 Min" },
          { title: "Frontal Lobe", video_length: "41 Min" },
          { title: "Praxicons", video_length: "28 Min" },
          { title: "Temporal and Occipital Lobe", video_length: "17 Min" },
          { title: "Language V/S Speech", video_length: "27 Min" },
          { title: "Memory", video_length: "26 Min" },
          { title: "Dementia: Part 1", video_length: "39 Min" },
          { title: "Dementia: Part 2", video_length: "42 Min" },
          { title: "Parkinson’s Disease", video_length: "80 Min" },
          { title: "Headache", video_length: "68 Min" },
          { title: "Seizure Semiology", video_length: "66 Min" },
          { title: "Generalised Tonic-Clonic Seizure", video_length: "38 Min" },
          { title: "CNS Infections", video_length: "51 Min" },
          { title: "LMN Approach: Part 1", video_length: "59 Min" },
          { title: "LMN Approach: Part 2", video_length: "24 Min" },
          { title: "Inherited Neuropathies", video_length: "23 Min" },
          { title: "Guillain-Barre Syndrome", video_length: "42 Min" },
          { title: "LMN Approach: Part 3", video_length: "26 Min" },
          { title: "LMN Approach: Part 3", video_length: "36 Min" },
          { title: "Muscular Dystrophies", video_length: "32 Min" },
          { title: "Myasthenia Gravis", video_length: "23 Min" },
          { title: "Amyotrophic Lateral Sclerosis", video_length: "24 Min" },
          { title: "Anatomy of Spinal Cord", video_length: "51 Min" },
          { title: "Diseases of Spinal Cord", video_length: "62 Min" },
          { title: "Multiple Sclerosis", video_length: "31 Min" },
          { title: "Vascular Anatomy of Brain", video_length: "56 Min" },
          { title: "Approach to UMN Lesion", video_length: "21 Min" },
          { title: "Approach to Stroke", video_length: "32 Min" },
          { title: "Brainstem Stroke", video_length: "51 Min" },
          { title: "Management of Stroke", video_length: "22 Min" },
        ],
      },
      {
        topic: "NEPHROLOGY - E8",
        subtopics: [
          { title: "Introduction to Nephrology", video_length: "6 Min" },
          { title: "Development of Kidneys", video_length: "35 Min" },
          { title: "Gross Anatomy of Kidney", video_length: "36 Min" },
          { title: "Tubular Anatomy", video_length: "82 Min" },
          { title: "Juxtaglomerular Apparatus", video_length: "24 Min" },
          { title: "Glomerulus: Anatomy", video_length: "27 Min" },
          { title: "Renal Physiology", video_length: "44 Min" },
          { title: "Urine Analysis", video_length: "41 Min" },
          {
            title: "Basic Approach to Kidney Disease and Renal Artery Stenosis",
            video_length: "40 Min",
          },
          { title: "Thrombotic Microangiopathy", video_length: "24 Min" },
          { title: "Glomerular Disease: Patterns", video_length: "48 Min" },
          { title: "Podocytopathies", video_length: "55 Min" },
          { title: "MPGN and IgA Nephropathy", video_length: "37 Min" },
          {
            title: "Post Streptococcal Glomerulonephritis",
            video_length: "24 Min",
          },
          {
            title: "RPGN and Pulmonary Renal Syndrome",
            video_length: "30 Min",
          },
          { title: "Familial Glomerular Syndromes", video_length: "14 Min" },
          { title: "Ciliopathies", video_length: "35 Min" },
          {
            title: "Chronic Tubulointerstitial Disease",
            video_length: "16 Min",
          },
          { title: "Acute Kidney Injury", video_length: "67 Min" },
          { title: "Chronic Kidney Disease", video_length: "42 Min" },
          { title: "Anemia in Chronic Kidney Disease", video_length: "23 Min" },
          {
            title: "CKD: Calciphylaxis and Cardiovascular Changes",
            video_length: "31 Min",
          },
          { title: "Diabetic Kidney Disease", video_length: "27 Min" },
        ],
      },
      {
        topic: "Acid-Base Regulation - E8",
        subtopics: [
          {
            title: "Introduction to Acid Base Analysis",
            video_length: "61 Min",
          },
          {
            title: "Metabolic Alkalosis",
            video_length: "19 Min",
          },
          {
            title: "Methodology and Interpretation of ABG Analysis",
            video_length: "41 Min",
          },
          {
            title: "Case Scenarios on ABG",
            video_length: "71 Min",
          },
        ],
      },
      {
        topic: "Endocrinology - E8",
        subtopics: [
          {
            title: "Introduction to Endocrinology",
            video_length: "14 Min",
          },
          {
            title: "Overview of Hormones",
            video_length: "52 Min",
          },
          {
            title: "Physiology of Adrenal Cortex",
            video_length: "23 Min",
          },
          {
            title: "Conn's Syndrome",
            video_length: "31 Min",
          },
          {
            title: "Cushing's Syndrome",
            video_length: "50 Min",
          },
          {
            title: "Addison's Disease",
            video_length: "27 Min",
          },
          {
            title: "Adrenal Medulla: Part 1",
            video_length: "43 Min",
          },
          {
            title: "Adrenal Medulla: Part 2",
            video_length: "37 Min",
          },
          {
            title: "Basics of Bone and Mineral Metabolism",
            video_length: "57 Min",
          },
          {
            title: "Calcium Metabolism",
            video_length: "20 Min",
          },
          {
            title: "Hypercalcemia",
            video_length: "37 Min",
          },
          {
            title: "Hypocalcemia",
            video_length: "23 Min",
          },
          {
            title: "Phosphorus Metabolism",
            video_length: "36 Min",
          },
          {
            title: "Magnesium Metabolism",
            video_length: "26 Min",
          },
          {
            title: "Osteoporosis",
            video_length: "24 Min",
          },
          {
            title: "Basics of Thyroid Gland",
            video_length: "29 Min",
          },
          {
            title: "Thyroid Function Tests",
            video_length: "28 Min",
          },
          {
            title: "Hypothyroidism",
            video_length: "38 Min",
          },
          {
            title: "Thyrotoxicosis and Thyroiditis",
            video_length: "48 Min",
          },
          {
            title: "Introduction to Diabetes Mellitus and Classification",
            video_length: "68 Min",
          },
          {
            title:
              "Insulin Physiology and Acute Complications of Diabetes Mellitus",
            video_length: "36 Min",
          },
          {
            title: "Management of Diabetes Mellitus: 2024 Guidelines",
            video_length: "19 Min",
          },
          {
            title: "Basics of Pituitary Gland",
            video_length: "36 Min",
          },
          {
            title: "Prolactin",
            video_length: "24 Min",
          },
          {
            title: "Prolactin",
            video_length: "34 Min",
          },
          {
            title: "Growth Hormone",
            video_length: "40 Min",
          },
          {
            title: "Acquired Hypopituitarism",
            video_length: "43 Min",
          },
          {
            title: "Antidiuretic Hormone",
            video_length: "30 Min",
          },
          {
            title: "Hyponatremia",
            video_length: "37 Min",
          },
          {
            title: "Polyuria",
            video_length: "23 Min",
          },
          {
            title: "Potassium Metabolism",
            video_length: "58 Min",
          },
          {
            title: "Management of Hypertension: 2023 Guidelines",
            video_length: "40 Min",
          },
        ],
      },
      {
        topic: "Hepatology - E8",
        subtopics: [
          {
            title: "Introduction to Hepatology",
            video_length: "6 Min",
          },
          {
            title: "Basics of Development and Anatomy of Liver",
            video_length: "31 Min",
          },
          {
            title: "Basics of Physiology of Liver",
            video_length: "76 Min",
          },
          {
            title: "Acute Hepatitis and Acute Liver Failure",
            video_length: "38 Min",
          },
          {
            title: "Chronic Hepatitis: Cirrhosis",
            video_length: "22 Min",
          },
          {
            title: "Portal Hypertension",
            video_length: "24 Min",
          },
          {
            title: "Ascites and Hepatorenal Syndrome",
            video_length: "39 Min",
          },
          {
            title: "Hepatic Encephalopathy",
            video_length: "17 Min",
          },
          {
            title: "Metabolic Diseases of Liver",
            video_length: "50 Min",
          },
          {
            title: "Biliary Cirrhosis",
            video_length: "16 Min",
          },
          {
            title: "Autoimmune Hepatitis",
            video_length: "18 Min",
          },
          {
            title: "Alcoholic Liver Disease",
            video_length: "22 Min",
          },
          {
            title: "Nonalcoholic Steatohepatitis",
            video_length: "17 Min",
          },
          {
            title: "Vascular Diseases of Liver",
            video_length: "17 Min",
          },
          {
            title: "Hepatitis B Virus: Part 1",
            video_length: "41 Min",
          },
          {
            title: "Hepatitis B Virus: Part 2",
            video_length: "50 Min",
          },
          {
            title: "Hepatitis C Virus",
            video_length: "29 Min",
          },
        ],
      },
      {
        topic: "Infectious Diseases - E8",
        subtopics: [
          {
            title: "Infective endocarditis",
            video_length: "68 Min",
          },
          {
            title: "Tropical Infections: Synopsis",
            video_length: "42 Min",
          },
          {
            title: "HIV",
            video_length: "53 Min",
          },
        ],
      },
    ],
  },
  {
    subject: "Forensic Medicine",
    topics: [
      {
        topic: "Forensic Traumatology",
        subtopics: [
          {
            title: "Definitions in Forensic Medicine",
            video_length: "27 Min",
          },
          {
            title: "Blunt Trauma Injuries",
            video_length: "60 Min",
          },
          {
            title: "Sharp Trauma Injuries",
            video_length: "35 Min",
          },
          {
            title: "Regional Injuries: Part 1",
            video_length: "40 Min",
          },
          {
            title: "Regional Injuries: Part 2",
            video_length: "34 Min",
          },
          {
            title: "Thermal Injuries",
            video_length: "61 Min",
          },
          {
            title: "Proximal Ballistics",
            video_length: "67 Min",
          },
          {
            title: "Intermediate and Terminal Ballistics: Part 1",
            video_length: "42 Min",
          },
          {
            title: "Intermediate and Terminal Ballistics: Part 2",
            video_length: "45 Min",
          },
          {
            title:
              "Electrical Injuries, Explosion Injuries and Torture Methods",
            video_length: "53 Min",
          },
          {
            title: "Transportation Injuries",
            video_length: "42 Min",
          },
        ],
      },
      {
        topic: "Medical Jurisprudence - E8",
        subtopics: [
          {
            title: "Indian Legal System",
            video_length: "55 Min",
          },
          {
            title: "Medical Ethics",
            video_length: "37 Min",
          },
          {
            title: "Medical Negligence",
            video_length: "74 Min",
          },
          {
            title: "Consent in Medical Practice",
            video_length: "32 Min",
          },
        ],
      },
      {
        topic: "Forensic Pathology",
        subtopics: [
          {
            title: "Autopsy Procedures",
            video_length: "68 Min",
          },
          {
            title: "Early Postmortem Changes",
            video_length: "62 Min",
          },
          {
            title: "Late Postmortem Changes",
            video_length: "43 Min",
          },
          {
            title: "Human Identification: Part 1",
            video_length: "42 Min",
          },
          {
            title: "Human Identification: Part 2",
            video_length: "76 Min",
          },
          {
            title: "Human Identification: Part 3",
            video_length: "34 Min",
          },
          {
            title: "Hanging",
            video_length: "62 Min",
          },
          {
            title: "Strangulation",
            video_length: "17 Min",
          },
          {
            title: "Suffocation",
            video_length: "17 Min",
          },
          {
            title: "Drowning",
            video_length: "52 Min",
          },
        ],
      },
      {
        topic: "Sexual Jurisprudence",
        subtopics: [
          {
            title: "Impotence, Virginity and Delivery",
            video_length: "68 Min",
          },
          {
            title: "Abortion",
            video_length: "29 Min",
          },
          {
            title: "Infant Deaths and Child Abuse",
            video_length: "39 Min",
          },
          {
            title: "Sexual Offences",
            video_length: "75 Min",
          },
        ],
      },
      {
        topic: "Toxicology",
        subtopics: [
          {
            title: "General Toxicology",
            video_length: "75 Min",
          },
          {
            title: "Duties of a Doctor in a Case of Poisoning",
            video_length: "31 Min",
          },
          {
            title: "Corrosive Poisons",
            video_length: "34 Min",
          },
          {
            title: "Metallic Irritants",
            video_length: "72 Min",
          },
          {
            title: "Non-Metallic Irritants",
            video_length: "20 Min",
          },
          {
            title: "Organic Irritants",
            video_length: "65 Min",
          },
          {
            title: "Neurotoxic Poisons: Deliriants",
            video_length: "62 Min",
          },
          {
            title: "Neurotoxic Poisons: Inebriants",
            video_length: "34 Min",
          },
          {
            title: "Neurotoxic Poisons: Somniferous and Spinal Poisons",
            video_length: "34 Min",
          },
          {
            title: "Asphyxiants and Cardiac Poisons",
            video_length: "57 Min",
          },
          {
            title: "Agricultural Poisons",
            video_length: "21 Min",
          },
        ],
      },
      {
        topic: "Forensic Psychiatry and Miscellaneous",
        subtopics: [
          {
            title: "Forensic Psychiatry",
            video_length: "47 Min",
          },
          {
            title: "Trace Evidence",
            video_length: "23 Min",
          },
          {
            title: "Acts and Legal Sections of Importance",
            video_length: "66 Min",
          },
        ],
      },
    ],
  },
];

/**
 * Convert video subtopics to mystery topics
 */
function convertVideosToMysteryTopics(
  videosData: VideosData[]
): MysteryTopic[] {
  const mysteryTopics: MysteryTopic[] = [];

  videosData.forEach((subjectData) => {
    subjectData.topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic, index) => {
        // Parse video length to get estimated time
        const timeMatch = subtopic.video_length.match(/(\d+)/);
        const estimatedTime =
          timeMatch && timeMatch[1] ? parseInt(timeMatch[1]) : 30;

        // Generate unique ID
        const id = `${subjectData.subject
          .toLowerCase()
          .replace(/\s+/g, "-")}-${topic.topic
          .toLowerCase()
          .replace(/\s+/g, "-")}-${index + 1}`;

        // Create description based on subject and topic
        const description = `Explore ${subtopic.title} in the context of ${subjectData.subject}. This ${topic.topic} topic provides comprehensive coverage of key concepts and practical applications.`;

        // Generate relevant questions
        const questions = [
          `What are the key concepts covered in ${subtopic.title}?`,
          `How does ${subtopic.title} relate to ${topic.topic}?`,
          `What are the practical applications of ${subtopic.title} in ${subjectData.subject}?`,
        ];

        // Generate fun facts
        const funFacts = [
          `This video covers ${subtopic.title} in ${subtopic.video_length}`,
          `Part of the ${topic.topic} series in ${subjectData.subject}`,
          `Educational content designed for comprehensive understanding`,
        ];

        // Get related topics from the same subject/topic
        const relatedTopics = topic.subtopics
          .filter((s) => s.title !== subtopic.title)
          .slice(0, 3)
          .map((s) => s.title);

        mysteryTopics.push({
          id,
          title: subtopic.title,
          description,
          category: subjectData.subject,
          difficulty:
            estimatedTime > 60
              ? "Advanced"
              : estimatedTime > 30
              ? "Intermediate"
              : "Beginner",
          estimatedTime,
          tags: [topic.topic.toUpperCase()],
          questions,
          funFacts,
          relatedTopics,
        });
      });
    });
  });

  return mysteryTopics;
}

// Convert and export mystery topics from videos data
export const mysteryTopics: MysteryTopic[] =
  convertVideosToMysteryTopics(VideosData);
