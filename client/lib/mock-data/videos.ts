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
          { title: "Concept of Enzyme Regulation", video_length: "24 Min" },
        ],
      },
      {
        topic: "Enzymology",
        subtopics: [
          { title: "Introduction to Enzymes", video_length: "27 Min" },
          { title: "Classification of Enzymes", video_length: "67 Min" },
          { title: "Mechanism of Action of Enzymes", video_length: "37 Min" },
          { title: "Enzyme Kinetics", video_length: "45 Min" },
          { title: "Enzyme Inhibition", video_length: "33 Min" },
          { title: "Enzyme Regulation", video_length: "43 Min" },
          { title: "Clinical Enzymology", video_length: "52 Min" },
        ],
      },
      {
        topic: "Carbohydrates",
        subtopics: [
          { title: "Chemistry of Carbohydrates", video_length: "61 Min" },
          { title: "Glycosaminoglycans", video_length: "43 Min" },
          { title: "Glucose Transporters", video_length: "34 Min" },
          { title: "Glycolysis: Part 1", video_length: "53 Min" },
          { title: "Glycolysis: Part 2", video_length: "27 Min" },
          { title: "Pyruvate Dehydrogenase", video_length: "32 Min" },
          { title: "Glycogen Metabolism", video_length: "47 Min" },
          { title: "Glycogen Storage Disorders", video_length: "52 Min" },
          { title: "Gluconeogenesis", video_length: "36 Min" },
          { title: "Minor Metabolic Pathways", video_length: "70 Min" },
        ],
      },
      {
        topic: "Lipids",
        subtopics: [
          { title: "Chemistry of Lipids", video_length: "46 Min" },
          { title: "Phospholipids", video_length: "60 Min" },
          {
            title: "Lipid Metabolism in Fasting State",
            video_length: "73 Min",
          },
          { title: "Lipid Metabolism in Fed State", video_length: "56 Min" },
          { title: "Ketone Body Synthesis", video_length: "26 Min" },
          { title: "Lipoproteins and its Metabolism", video_length: "48 Min" },
          { title: "Dyslipidemia", video_length: "43 Min" },
        ],
      },
      {
        topic: "Proteins & Amino Acids",
        subtopics: [
          { title: "Chemistry of Amino Acids", video_length: "70 Min" },
          { title: "Fibrous Proteins", video_length: "29 Min" },
          { title: "General Amino Acid Metabolism", video_length: "40 Min" },
          { title: "Urea Cycle and Its Disorders", video_length: "43 Min" },
          { title: "Aromatic Amino Acids", video_length: "67 Min" },
          { title: "Sulphur Containing Amino Acids", video_length: "47 Min" },
          { title: "Tryptophan", video_length: "34 Min" },
          { title: "Miscellaneous Amino Acids", video_length: "62 Min" },
        ],
      },
      {
        topic: "Bioenergetics",
        subtopics: [
          { title: "Krebs Cycle", video_length: "36 Min" },
          { title: "Electron Transport Chain", video_length: "49 Min" },
        ],
      },
      {
        topic: "Molecular Biology",
        subtopics: [
          { title: "Chemistry of Nucleotides", video_length: "25 Min" },
          { title: "Metabolism of Nucleotides", video_length: "47 Min" },
          {
            title: "Structure and Organisation of DNA",
            video_length: "47 Min",
          },
          { title: "DNA Replication", video_length: "76 Min" },
          { title: "Transcription", video_length: "73 Min" },
          { title: "Translation", video_length: "49 Min" },
          { title: "Regulation of Gene Expression", video_length: "63 Min" },
          { title: "Hybridization Techniques", video_length: "45 Min" },
          { title: "Recombinant DNA Technology", video_length: "55 Min" },
          {
            title: "Amplification and Sequencing Techniques",
            video_length: "84 Min",
          },
          { title: "Mutation", video_length: "33 Min" },
        ],
      },
      {
        topic: "Vitamins",
        subtopics: [
          { title: "Fat Soluble Vitamins", video_length: "78 Min" },
          { title: "Hematopoietic Vitamins", video_length: "43 Min" },
          { title: "Energy Releasing Vitamins", video_length: "37 Min" },
          { title: "Vitamin B6 and C", video_length: "23 Min" },
          { title: "Heme Metabolism", video_length: "60 Min" },
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
];

/**
 * Convert video subtopics to mystery topics
 */
function convertVideosToMysteryTopics(videosData: VideosData[]): MysteryTopic[] {
  const mysteryTopics: MysteryTopic[] = [];
  
  videosData.forEach((subjectData) => {
    subjectData.topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic, index) => {
        // Parse video length to get estimated time
        const timeMatch = subtopic.video_length.match(/(\d+)/);
        const estimatedTime = timeMatch && timeMatch[1] ? parseInt(timeMatch[1]) : 30;
        
        // Generate unique ID
        const id = `${subjectData.subject.toLowerCase().replace(/\s+/g, '-')}-${topic.topic.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`;
        
        // Create description based on subject and topic
        const description = `Explore ${subtopic.title} in the context of ${subjectData.subject}. This ${topic.topic} topic provides comprehensive coverage of key concepts and practical applications.`;
        
        // Generate relevant questions
        const questions = [
          `What are the key concepts covered in ${subtopic.title}?`,
          `How does ${subtopic.title} relate to ${topic.topic}?`,
          `What are the practical applications of ${subtopic.title} in ${subjectData.subject}?`
        ];
        
        // Generate fun facts
        const funFacts = [
          `This video covers ${subtopic.title} in ${subtopic.video_length}`,
          `Part of the ${topic.topic} series in ${subjectData.subject}`,
          `Educational content designed for comprehensive understanding`
        ];
        
        // Get related topics from the same subject/topic
        const relatedTopics = topic.subtopics
          .filter(s => s.title !== subtopic.title)
          .slice(0, 3)
          .map(s => s.title);
        
        mysteryTopics.push({
          id,
          title: subtopic.title,
          description,
          category: subjectData.subject,
          difficulty: estimatedTime > 60 ? "Advanced" : estimatedTime > 30 ? "Intermediate" : "Beginner",
          estimatedTime,
          tags: [topic.topic.toUpperCase()],
          questions,
          funFacts,
          relatedTopics
        });
      });
    });
  });
  
  return mysteryTopics;
}

// Convert and export mystery topics from videos data
export const mysteryTopics: MysteryTopic[] = convertVideosToMysteryTopics(VideosData);
