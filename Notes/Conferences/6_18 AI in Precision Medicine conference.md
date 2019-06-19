# 6/18 AI in Precision Medicine conference

## First session

---

### Matt Might

- low hanging fruits
  - pharmacokinetics - look at genotype and then
- precision medicine - two parts
  - precision diagnosis
    - undiagnosed diseases network - has revolutionaized this
  - precision therapeutics
    - drug repurposing - find a drug that can target that specific thing you need
      - NCATS translation program - allowed him to do this
      - logical reasoning + biomedical knowledge
      - use PROLOG style reasoning (on steroids) - logical reasoning, knowledge representation, can actually provide a proof
      - added Pubmed abstracts, add other databases (drug databases, etc.) - on Github
    - Medikanren
      - dark data?
      - show evidence on both sides
      - train undergrads to use the tool, they communicate with physicians
- don't have to just use genomics - can also use transcriptomes, brain connectomes, metabolomes

### Andrea

- FDA - thinking of software as a healthcare device
  - wehearthackers.org - FDA working with security researchers to secure healthcare devices
  - Hippocratic Oath for medical devices researchers

### Kadija Ferryman

- Mozilla Fellow
- weapons of math destruction - book

### Jim

- Pubmed founder
- "best" content difficult to give back based on short queries

### Jonathan

- ML incurs intellectual debt
- statistical correlations exist everywhere because there's so much data
  - future where people try to figure out causes vs. everybody just tries different ML

### Questions

- moral crumple zone
- human in the loop
- no such thing as a neutral system - society/engineers/etc. all have biases
-
- why software sucks - book author asked a question
  - MBTA has an API, should Pubmed do similar stuff - they do have API's that they encourage
- sequence microbiome to identify nutrition patterns
- accuracy not the only thing important - usability, attacks, data leakage
- how to create better datasets

## Second session - is there value in prediction?

---

### Gabriel Brat, Beth Israel Deaconess Medical Center

- trauma surgeon, DBMI instructor, Tissue Analytics (company)
- top AI appplications - Accenture white paper
- wishes we could have a single gold standard for each condition

### Christine Silvers, MD/PhD, CMO HealthReveal

- clinical decision support space
- when creating predictive models
  - are we considering all relevant inputs?
  - are we considering all relevant outcomes?
- need prospective studies to determine mechanisms behind correlation

### Arnaub Chatterjee

- Medidata company (subsidiary?) - Acorn AI
  - recently acquired by Dassault
- prediction has already been around for a while - how can we improve from current state
- Emory sepsis project
- Vanderbilt suicide prediction

### Shez Partovi, Amazon Web Services

- physician training, did IT/health startups, joined AWS as worldwide lead for healthcare, life sciences, genomics
- early phase research - Numerate
- clinical trials - Knowledgent clinical cloud
- genomics - **Grail - liquid biopsy (company)**
- digital therapeutics - Propeller self management (company)
- training the models (3 V's)
  - variety - diversity of samples
  - volume
  - veracity
- what's the implication of a no show
- EHR company in UK - listens to conversation and then changes the EHR interface based on the things they've been talking about

### Q&A

- will people obey data/AI suggestions - compliance

## Keynote - Regina Barzilay MIT CSAIL

---

- leads a consortia of pharmaco
- **only 5% of hospitals claim to use AI**
- wants to do prediction from raw data instead of relying on manual input
- built an NLP system that can identify patients retrospectively that can become part of a study
- how to/not to use AI in medicine
- many ways to handle bias
  - data curation
  - anti bias
  - human machine validation
- the emperor of all maladies (book)
- interpretability is key
  - black box architectures are not good
- breast cancer - why do denser breast tissues have higher risk for cancer
- **J-clinic** - machine learning in health
  - AI algorithm development - reduce data needed for training
  - privacy preserving learning
  - robust transfer across diverse population
  - increase transparency and interpretability of tools
- best way to integrate additional data actually not to add it in as input, but train the model to predict the other features

## Panel 3 - Hyperindividualized Treatments

---

### What's possible - Tim Yu (New opportunities for patient tailored therapies)

- neurologist, geneticist
- Batten's disease
- first drug created and approved for a single patient, on the basis of her genomic sequence
- regulatory pathway for approving hyperindividualized medicine

### Key barriers - George Church

- gene therapy drugs are expensive
- trying to bring down price of drugs
- bring down cost
  - no FDA trial for n=1 because it can't be done
  - eliminate therapy - genetic counseling, prevention
    - sometimes too late to have this therapy - cancer too late, already had a child

### Population perspective - Ken Ehlert

- trying to develop personalized medicine at scale

### Entrepreneur POV - Matt Disilva

- inclusion/exclusion criteria for clinical trials
- chemosensitivity
- GBM - turnaround time not fast enough
- high throughput, automated lab - test 1000s of combinations of drugs
- big barrier to hyperindividualized treatments is if the specific drug treatment has been tested before
-

### Patient impact - Kimberly LeBlanc

- Undiagnosed diseases network - multisite research project, NIH funded
- for patients who have already been to many medical centers and can't get a diagnosis
- have found rare/new diseases

## Closing keynote - Jim Tananbaum, Foresite Capital

---

- thinks we're hitting the end of innovation cycle of the last 50 years or so
- **Mary Meeker report**
- there are a ton of closed loop systems everywhere - trying to figure out if we fit the patterns that they want us to be in
- thinks there aren't that many things that we need to keep track of for most people - there are some exceptions to that for people with more rare conditions/circumstances
- thinks next innovation cycle will be about **precision prevention**
- certain things that are actionable that we aren't acting on
  - there are a ton of people with high cholesterol who aren't getting treatment
  - **polygenic calculations (?)**
  - germline polygenic measurements of disease - becoming a big thing
  - somatic mutation diseases - cancer screenings for earlier detection
    - cell free DNA
    - other omics that may also get added
- what is two year churn?
- thinks socialized would solve some problems but create a lot of others
