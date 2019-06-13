# Biomarkers

---

### [Biomarkers for immunotherapy conversation](https://www.cancer.gov/news-events/cancer-currents-blog/2018/immunotherapy-biomarkers-research-network)

- there is a new NCI network dedicated to finding biomarkers for immunotherapy
- structure of the network
  - Cancer Immune Monitoring and Analysis Centers (CIMACs)
  - Cancer Immunologic Data Commons (CIDC) - **hosted at Dana-Farber Cancer Institute (maybe go look at it)**, collect biomarker data genereated at four CIMACs and integrate patient clinical data
- goals
  - find biomarkers (aka moleculare signatures) to identify patients who might respond well to immunotherapy
  - investigate mechanisms of resistance to immunotherapy, monitor patients' responses to treatment
- methodology
  - CIMACS conduct assays and testing on samples from phase 1/2 trials funded by NCI
- existing biomarkers

  - PD-L1 levels expressed on tumor/immune cells in the tumor microenvironment
  - tumor mutational burden - number of genetic mutations in a tumor
  - not precise enough

### [More detailed paper on immunotherapy biomarkers](https://www.esmo.org/Conferences/Past-Conferences/ESMO-Immuno-Oncology-Congress-2017/Educational-Articles/Cancer-Immunotherapy-Biomarkers)

- [the cancer immunogram](https://www.ncbi.nlm.nih.gov/pubmed/30274701) - 7 parameters that can be found for individual patients and are known to affect the anticancer immune response
  - tumour mutational burden
  - the general immune status of the patient
  - presence of T cell immune infiltrates
  - tumour PD-L1 expression
  - sensitivity of tumour cells to T-cell killing (including MHC expression functional IFN-g receptor pathway)
  - a myeloid cell-mediated inflammation (high C-reactive protein (CRP) and IL-6 levels)
  - and high serum lactate dehyrogenase (LDH) (reflecting both tumour burden and anaerobic glycolysis)
- PD-L1 expression
  - can be caused by gene amplification (e.g. Hodgkin's lymphoma)
  - classical types of cancer that have responded to PD-1/PD-L1 have expressed this biomarker at varying percentages
  - some IHC-neg patients still responsive to therapy
  - the response from apparently PD-L1 negative tumors might reflect problems with IHC testing/tumor biology
    - PD-L1 expressed at different times/places in the tumor
  - 4 companion approved IHC tests by FDA, one apparently different from the others
  - [additional paper discussing this biomarker specifically](http://mct.aacrjournals.org/content/14/4/847.long#sec-7)
- tumors with high mutational burden (MSI<sup>hi</sup> or dMMR - DNA mismatch repair deficient)
  - more mutations = generally better response
  - no hard cutoff found
  - hypothesis is that more mutations creates a more "foreign" tumor = more neoantigens
  - any cancers with MSI-H/dMMR have been approved for pembrolizumab - `indication for adult and paediatric patients with unresectable or metastatic solid tumours that have progressed on alternative drugs, based on a positive IHC or PCR test for MSI-high or dMMR`
  - n = 149 study of solid tumors had 40% response rate
- T-cell receptor repertoire
  - need to have enough types of TCR's - can be assessed by sequencing of TCR Vβ genes to see diversity
  - more T-cells at the tumor correlated with better response to checkpoint inhibitors
- tumor microenvironment/tumor gene expression profile
  - hot/inflamed
    - more immune cell infiltrates
    - PD-L1 expression
    - IFNg or T-cell gene signature correlated with cytolytic T-cell response
  - cold/"immune desert"
    - primary resistance to immunotherapy
  - immune excluded
    - immune cells in tumor stroma but don't enter the tumor
    - may be resistant to current immunotherapies
    - no T cell or IFNg gene signatures
  - need to have T cell infiltration to be responsive to immunotherapy
- serum biomarkers
  - link between these biomarkers and immune response outcome still experimental
  - `several serum markers such as lactate dehydrogenase (LDH), CRP, vascular endothelial growth factor (VEGF) and soluble CD25 are associated with response to anti-CTLA-4 and PD-1/PD-L1 blockade in advanced melanoma`
  - `Serum LDH >2xULN is highly predictive of unresponsiveness to CTLA-4 blockade, and to a lesser extend also to anti-PD-1 treatment. If feasible, these patients should be treated with combination immunotherapy`
  - `Baseline neutrophil-to-lymphocyte ratios and relative eosinophil count are associated with response to ICPi` - **not yet demonstrated to be reliable**
- likely will need more clinical studies to determine real predictive value, will likely need more complex predictive biomarker systems

### [Blood Test Shows Promise for Detecting Genetic Changes in Brain Tumors](https://www.cancer.gov/news-events/cancer-currents-blog/2018/liquid-biopsy-childhood-brain-tumors)

- liquid biopsy - may reveal whether a diffuse midline glioma has a specific genetic mutation **in a child**
- DNA from tumors can be detected in blood
- noninvasive test - can detect recurrences earlier
- not ready for pediatric clinical use yet - there have been some developed for adults
- could be used on both blood and CSF (but a spinal tap needed for CSF, which is more invasive and not suitable for all children)
- still testing by getting patients who are candidates for surgical biopsy to make sure that the tests work
- **not always clear from MRI if a tumor is progressing or not - might be part of the body's immune response (pseudoprogression)**

### [Using Artificial Intelligence to Classify Lung Cancer Types, Predict Mutations](https://www.cancer.gov/news-events/cancer-currents-blog/2018/artificial-intelligence-lung-cancer-classification)

- [based on paper here](https://www.ncbi.nlm.nih.gov/pubmed/30224757)
- trained deep CNN ([inception v3](https://medium.com/@sh.tsang/review-inception-v3-1st-runner-up-image-classification-in-ilsvrc-2015-17915421f77c)) to identify whether tissue was diseased or normal
- also trained to predict for presence of certain mutations just from the pathology slides
- used TCGA data to train
- over 90% validation accuracy on completely separate collections
- works in seconds - proposed to use during surgery to tell surgeon if they need to collect another sample
- augment rather than replace pathologists

### [CRISPR has been used to treat US cancer patients for the first time](https://www.technologyreview.com/f/613321/crispr-has-been-used-to-treat-us-cancer-patients-for-the-first-time/)

- modified T cells (ex vivo) to add a gene to attack cancer and remove PD-1 gene
- UPenn study - essentially like CAR-T cells, starting clinical trials 2019

### [First U.S. use of CRISPR to directly target cancer will seek go-ahead from regulators](https://www.statnews.com/2019/05/02/crispr-targeting-cancer-seeking-go-ahead/)

- researchers in China rumored to already be using CRISPR for cancer patients
- most U.S. studies are using CRISPR to edit T-cells
- The Gene Editing Institute at Christiana Care Health System wants to disable a gene in patients with late stage non-small-cell lung cancer to boost chemotherapy benefits
- still need to figure out how to deliver the CRISPR to the tumor cells
  - direct injection
  - adeno-associated viruses (AAVs) - target the lung cells
- testing on late stage patients - don't have decades to live, criticism of CRISPR approaches is that it might cause later mutations

### [Novel two-drug combo teaches immune system to attack cancer](https://www.fiercebiotech.com/research/novel-two-drug-combo-teaches-immune-system-to-attack-cancer)

- CAR-T cells approved to attack cancer by FDA
- what if direct injection of drugs would work - **in situ vaccination**
  - Mt. Sinai study has evidence this might be effective for lymphoma
- used vaccination method combined with checkpoint inhibitor
- new clinical trials to test combination of their vaccine with Keytruda

### [Fecal transplants could help patients on cancer immunotherapy drugs](https://www.sciencemag.org/news/2019/04/fecal-transplants-could-help-patients-cancer-immunotherapy-drugs)

- fecal transplant helped people who didn't respond well to immunotherapy
- fecal transplants from people who responded to immunotherapy transferred to those who didn't, promising early results
- gut microbiomes of the recipients changed to match donors
- still don't know which microbes specifically help mediate the immune response
- some patients who took probiotics actually had worse response

### [Probiotics are touted as good for the gut. They may be trouble for the immune system](https://www.statnews.com/2019/04/02/probiotics-are-touted-as-good-for-the-gut-they-may-be-trouble-for-the-immune-system/)

- probiotics lightly regulated - don't even have to have consistent strains between batches
- in a small study (n=46) patients who took probiotics had a worse immunotherapy response
- not a lot of literature to support taking probiotics supplements
- cancer patients often take probiotics to try to help side effects such as diarrhea
- `The study also found that higher fiber intake was correlated with more lush microbiomes — and stronger responses to immunotherapy.`
- `probiotic supplements actually decreased the diversity of participants’ microbiomes after they’d taken a course of antibiotics. In fact, the guts of those who took probiotics took much longer than those who did not to fully recover`

### [Some Brain Tumors May Respond to Immunotherapy, New Study Suggests](https://www.cuimc.columbia.edu/news/some-brain-tumors-may-respond-immunotherapy-new-study-suggests)

- `slow-growing brain tumor arising in patients affected by neurofibromatosis type 1 (NF1) may be vulnerable to immunotherapy`
- `An estimated 100,000 individuals in the United States have NF1, a hereditary disease that can lead to the development of tumors throughout the nervous system, including a type of brain tumor called a glioma. Children usually have a slow-growing type of glioma, whereas adults often have a more aggressive type.`
- resistant to chemo, radiation makes symptoms worse, surgery hard b/c sensitive brain regions
- a lot of brain tumors have large number of macrophages (which can decrease immune response)
  - found that slow growing NF1 gliomas have few macrophages and more neoantigens
  - `approximately 50 percent of the slow-growing NF1 gliomas contained large numbers of T cells that have the ability to destroy cancer cells`
  - **`a subgroup of brain tumors in patients without NF1 share the same molecular profile as the slow-growing NF1 gliomas`** - LOOK INTO WHAT THESE ARE
- `Aggressive NF1 gliomas could be weakened with DNA-damaging drugs`
  - tumors still have a lot of macrophages, but replication mistakes can be targeted
  - prevent replication/tumor growth

### Sources

- https://www.uptodate.com/contents/patient-selection-criteria-and-toxicities-associated-with-checkpoint-inhibitor-immunotherapy
  - there's a part about biomarkers associated with toxicities
- [Genomic Data Commons](https://gdc.cancer.gov/) - a ton of cases with associated genomics data
  - [overview](https://gdc.cancer.gov/about-gdc/gdc-overview)
  - about 2400 cases for brain/nervous system
  - [data portal](https://portal.gdc.cancer.gov/)
- [The Cancer Genome Atlas Program](https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga)
