# Sequencing Cancer Genomes by Peter Park

### Mutational processes in cancer/normal cells

- cancer has the best datasets because of funding, also has a lot of tech
- cancer is a disease of the genome
- circus plot
  - shows
    - point mutations
    - copy number changes
    - translocations
  - only shows the info from bulk sequencing
- somatic mutations in the brain? - controversy about whether this happens
- uncertainty about mutational rate - can't measure directly
  - even for single cell sequencing - there are a lot of errors in sequencing

### Data-driven paradigm

- old way: new ideas -> new techniques -> new discoveries
- new way: new techniques -> new observations -> new ideas
- Sydney Brenner - interesting quotes, Nobel laureate who introduced C. elegans as a model species
- genomic data analysis
  - many errors in literature
  - data too complex, people also aren't careful because very fast-paced field
  - everybody has same tech - need to rush discoveries
  - peer review process
    - too much stuff for people to go over carefully
    - PI depends on grad/postdocs to get things right - maybe not an expert in math but good at genetics
- STAP cell controversy
  - reprogram cells by taking normal cells, put it in acid bath, shock it into becoming pluripotent again
  - couldn't reproduce - found from genetic analysis that there was contamination from embryonic stem cells, don't know if it was intentional or not to this day

### Whole genome sequencing

- Illumina dominates the field
  - HiSeq X Ten - only buy in packs of 10, only sequence human genomes
  - just under \$10M
- can only sequence about 150bp and then piece together
  - because they are mounted on glass array, once they grow too tall, become unstable or degrade in solution
  - major limitation - no way to sequence longer reads
- PacBio - 50K for the same WGS
- data size
  - one 30X genome - ~200GB, quality score in addition to sequence
  - pair ~400GB - blood/brain pair
- AWS/availablility of sequencing machines - leveled the playing field for a lot of people
- The Cancer Genome Atlas
  - try to profile cancers
  - other datasets
    - Nature: A thousand genomes
    - Genomics england
    - regeneeron
    - geisinger health systems
    - million veteran program
    - [NHLBI TopMed](https://www.nhlbi.nih.gov/science/whole-genome-sequencing-wgs-project)
- Structural Mutations/signatures
  - if two genes map further than in the reference genome, then there was a deletion
  - if genes map smaller than in reference genome, then there was an insertion
  - if genes map farther and in opposite direction, then there was in inversion
  - usually have to use paired data
  - different signatures based on the type of mutation
  - large insertion (inter-chromosomal)
  - tandem duplication
  - novel insertion - insertion doesn't map to anything in the reference genome, might have been from exogeneous sources
- Chromothripsis
  - original model for cancer: progressive rearrangements model
    - thought mutations accumulated slowly
  - catastrophe model (observed 2011)
    - chromosome falls apart and then comes together
    - how does the cell survive still??? - tentative mechanisms proposed
- PARP inhibitors
  - PARP fixes single stranded breaks - inhibit it prevents ability to repair
  - don't know who would benefit from this drug (trying to find biomarkers)
    - BRCA1 - eligible
  - hard to tell for other types
    - WGS not being done in the clinic - people don't know how to deal with data
    - use panel sequencing data instead (select ~200 genes) - can you tell biomarkers just from panel
    - Only Peter's postdoc can do analysis for this data right now
    -
