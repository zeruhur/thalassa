pandoc -f gfm -t html -o pdf/thalassa.pdf -s md/*.md --pdf-engine=weasyprint --css="css/thalassa.css" --metadata-file="metadata.yml"