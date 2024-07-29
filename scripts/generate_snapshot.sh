#!/bin/bash

# Output directory
output_dir="snapshots"
mkdir -p "$output_dir"

# Function to display help message
show_help() {
    echo "Usage: $0 [OPTIONS] [COMPONENTS...]"
    echo
    echo "Generate snapshots of the project structure and file contents."
    echo
    echo "Options:"
    echo " -h, --help Show this help message and exit"
    echo " -f, --full Generate a full project snapshot (default if no components specified)"
    echo " -l, --list List available components"
    echo
    echo "Components:"
    echo " Specify one or more components to generate snapshots for specific parts of the project."
    echo " Available components: card_editor, card_viewer, deck_management, study_mode, esp32_code_generation"
    echo
    echo "Examples:"
    echo " $0 -f # Generate full project snapshot"
    echo " $0 card_editor study_mode # Generate snapshots for card_editor and study_mode components"
    echo " $0 -l # List available components"
}

# Function to list available components
list_components() {
    echo "Available components:"
    echo " - card_editor"
    echo " - card_viewer"
    echo " - deck_management"
    echo " - study_mode"
    echo " - esp32_code_generation"
}

# Function to create a tree-like structure of directories
# Function to create a tree-like structure of directories using ASCII characters
create_tree() {
    local dir="$1"
    local prefix="$2"
    local depth="$3"
    local maxdepth=3

    if [ "$depth" -ge "$maxdepth" ]; then
        return
    fi

    local files=("$dir"/*)
    local file
    local count=${#files[@]}
    local index=0

    for file in "${files[@]}"; do
        index=$((index + 1))
        if [ -d "$file" ]; then
            local name=$(basename "$file")
            if [[ "$name" != "node_modules" && "$name" != ".git" && "$name" != ".vscode" && "$name" != "$output_dir" ]]; then
                if [ $index -eq $count ]; then
                    echo "${prefix}+-- $name"
                    create_tree "$file" "$prefix    " $((depth + 1))
                else
                    echo "${prefix}+-- $name"
                    create_tree "$file" "$prefix|   " $((depth + 1))
                fi
            fi
        elif [ $index -eq $count ]; then
            echo "${prefix}+-- $(basename "$file")"
        else
            echo "${prefix}+-- $(basename "$file")"
        fi
    done
}

# Function to generate component snapshot (placeholder)
generate_component_snapshot() {
    local component="$1"
    echo "Generating snapshot for $component..."
    # Add component-specific snapshot generation logic here
}

# Main execution
if [ "$#" -eq 0 ]; then
    show_help
    exit 0
fi

generate_full=false
components=()

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -f|--full)
            generate_full=true
            shift
            ;;
        -l|--list)
            list_components
            exit 0
            ;;
        *)
            components+=("$1")
            shift
            ;;
    esac
done

if [ ${#components[@]} -eq 0 ] && [ "$generate_full" = false ]; then
    generate_full=true
fi

if [ "$generate_full" = true ]; then
    # Generate full project snapshot
    output_file="$output_dir/full_project_snapshot.txt"
    > "$output_file"
    echo "Generating full project snapshot..."
    echo "Project Structure:" >> "$output_file"
    if command -v tree &> /dev/null; then
        tree -L 3 -I "node_modules|.git|.vscode|$output_dir" --charset=ascii >> "$output_file"
    else
        create_tree . "" 0 >> "$output_file"
    fi
    echo "" >> "$output_file"
    echo "File Contents:" >> "$output_file"
    total_lines=0
    while IFS= read -r -d '' file; do
        echo "
File: $file
----------------------------------------" >> "$output_file"
        cat "$file" >> "$output_file"
        echo "----------------------------------------" >> "$output_file"
        lines=$(wc -l < "$file")
        total_lines=$((total_lines + lines))
    done < <(find . -type f \( -name "*.md" -o -name "*.feature" -o -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" -o -name "*.scss" -o -name "*.py" -o -name "*.cpp" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/$output_dir/*" -print0)
    echo "
Summary:
Total lines of user-generated content: $total_lines" >> "$output_file"
    echo "Full project snapshot has been saved to $output_file"
else
    # Generate snapshots for specified components
    for component in "${components[@]}"; do
        generate_component_snapshot "$component"
    done
fi