EXTENSIONS=(
  "abusaidm.html-snippets" \
  "alefragnani.Bookmarks" \
  "alefragnani.project-manager" \
  "christian-kohler.path-intellisense" \
  "CoenraadS.bracket-pair-colorizer" \
  "dbaeumer.jshint" \
  "douglaszaltron.nunjucks-vscode-extensionpack" \
  "eamodio.gitlens" \
  "esbenp.prettier-vscode" \
  "formulahendry.auto-rename-tag" \
  "gencer.html-slim-scss-css-class-completion" \
  "oderwat.indent-rainbow" \
  "shinnn.stylelint" \
  "streetsidesoftware.code-spell-checker" \
  "vscode-icons-team.vscode-icons" 
)

for VARIANT in "code" \
               "code-insiders"
do
  if hash $VARIANT 2>/dev/null; then
    echo "Installing extensions for $VARIANT"
    for EXTENSION in ${EXTENSIONS[@]}
    do
      $VARIANT --install-extension $EXTENSION
    done
  fi
done